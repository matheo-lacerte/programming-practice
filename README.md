# Programming Practice

Personal 30-minute practice routine for Python and Java.

## Rules

- Difficulty increases only after a session is actually completed.
- If a scheduled day is skipped, repeat the same difficulty with different exercises.
- Main focus rotates between Python and Java.
- Each session includes a mini-lesson, hands-on exercises, debugging, and a quick refresher.
- Solutions are not included up front.

## Quick Start

From this folder:

```bash
python3 tutor.py
```

Useful direct commands:

```bash
python3 tutor.py status
python3 tutor.py run Day1
python3 tutor.py hint Day1 Exercise1
python3 tutor.py import session-pack.json
```

## Local App

Open the app from:

```bash
python3 -m http.server 8765
```

Then visit `http://localhost:8765/app/`.

The app has an Import tab. Future scheduled sessions can be pasted or uploaded as a JSON session package. Use `session-package-template.json` as the format.

## Folder Layout

- `Day1/` - Java methods + parameters
- `app/` - local browser practice app
- `progress.json` - current difficulty and completion status
- `mistake_log.md` - personalized concepts to review
- `session-package-template.json` - import format for future sessions
- `tutor.py` - runner, checker, and hint helper

New day folders should come from your scheduled ChatGPT practice. Add the files first, then we can wire them into the runner.
