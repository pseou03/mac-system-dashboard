#!/bin/bash
# Read process information; never change a running process.
set -euo pipefail
export LC_ALL=C
umask 077
project_root=$(cd "$(dirname "$0")/.." && pwd)

# 1. Information collection
collected_at=$(date '+%Y-%m-%d %H:%M:%S')
# comm collects executable names/paths, not potentially secret command arguments.
# Collect before opening an output file so a failed ps keeps the previous snapshot.
processes=$(ps -axo pid=,ppid=,%cpu=,%mem=,etime=,user=,comm=)

# 2. Sorting and top-20 selection
# Consume all input to avoid the broken pipe that an early head exit can cause.
top_processes=$(printf '%s\n' "$processes" | sort -k3,3nr -k1,1n | awk 'NF >= 7 && ++count <= 20')
if [ -z "$top_processes" ]; then
  printf 'No process records collected; previous CSV preserved.\n' >&2
  exit 1
fi

# 3. Output
mkdir -p "$project_root/data"
output_file="$project_root/data/process_top20.csv"
temporary_file=$(mktemp "$project_root/data/.process_top20.XXXXXX")
trap 'rm -f "$temporary_file"' EXIT
printf '%s\n' "$top_processes" | awk -v timestamp="$collected_at" '
function quote(value) {
  gsub(/"/, "\"\"", value)
  return "\"" value "\""
}
BEGIN { print "collected_at,pid,ppid,cpu_percent,memory_percent,elapsed,user,command" }
{
  pid=$1; ppid=$2; cpu=$3; memory=$4; elapsed=$5; user=$6
  command=$0
  # Remove six whitespace-separated columns; preserve spaces within the command.
  for (i=1; i<=6; i++) sub(/^[[:space:]]*[^[:space:]]+[[:space:]]+/, "", command)
  printf "%s,%s,%s,%s,%s,%s,%s,%s\n", quote(timestamp),pid,ppid,cpu,memory,quote(elapsed),quote(user),quote(command)
}' > "$temporary_file"
# Atomic replacement prevents browsers from seeing a partially written CSV.
mv "$temporary_file" "$output_file"
printf 'Saved top processes to %s\n' "$output_file"
