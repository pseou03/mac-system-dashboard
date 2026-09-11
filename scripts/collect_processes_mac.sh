#!/bin/bash
# Read process information without changing any running process.
set -euo pipefail
export LC_ALL=C
# 1. Information collection
collected_at=$(date '+%Y-%m-%d %H:%M:%S')
processes=$(ps -axo pid=,ppid=,%cpu=,%mem=,etime=,user=,comm=)
# 2. Sorting and top-20 selection
# awk consumes every line, avoiding a broken pipe from an early head exit.
top_processes=$(printf '%s\n' "$processes" | sort -k3,3nr -k1,1n | awk 'NR <= 20')
# 3. Output
printf 'Collected at: %s\n' "$collected_at"
printf 'PID PPID CPU%% MEMORY%% ELAPSED USER COMMAND\n'
printf '%s\n' "$top_processes"
