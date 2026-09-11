"""Exercise the real shell pipeline with fake ps output; never collect host data."""
import csv
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]

class CollectorTests(unittest.TestCase):
    def test_csv_and_failure_preservation(self):
        # All temporary files stay inside the repository and are removed afterwards.
        with tempfile.TemporaryDirectory(dir=ROOT / 'tests') as temporary:
            root = Path(temporary)
            (root / 'scripts').mkdir()
            (root / 'bin').mkdir()
            script = root / 'scripts/collect_processes_mac.sh'
            shutil.copy2(ROOT / 'scripts/collect_processes_mac.sh', script)
            fake_ps = root / 'bin/ps'
            rows = [f'{100+i} 1 {i}.5 1.2 01:02:03 demo Worker{i}' for i in range(25)]
            rows[-1] = '124 1 24.5 2.1 01:02:03 demo Worker, "quoted"  name'
            fake_ps.write_text("#!/bin/sh\ncat <<'ROWS'\n" + '\n'.join(rows) + '\nROWS\n')
            fake_ps.chmod(0o755)
            environment = dict(os.environ, PATH=str(root / 'bin') + ':' + os.environ['PATH'])
            result = subprocess.run([str(script)], cwd=root / 'bin', env=environment, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            output = root / 'data/process_top20.csv'
            with output.open() as stream:
                parsed = list(csv.DictReader(stream))
            self.assertEqual(len(parsed), 20)
            self.assertEqual(len(output.read_text().splitlines()), 21)
            self.assertEqual(parsed[0]['command'], 'Worker, "quoted"  name')
            self.assertEqual(len({r['collected_at'] for r in parsed}), 1)
            cpus = [float(r['cpu_percent']) for r in parsed]
            self.assertEqual(cpus, sorted(cpus, reverse=True))
            self.assertEqual(output.stat().st_mode & 0o777, 0o600)
            original = output.read_bytes()
            for body in ['exit 1', 'exit 0']:
                fake_ps.write_text('#!/bin/sh\n' + body + '\n')
                result = subprocess.run([str(script)], env=environment, capture_output=True)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(output.read_bytes(), original)
            self.assertFalse(list((root / 'data').glob('.process_top20.*')))

if __name__ == '__main__':
    unittest.main()
