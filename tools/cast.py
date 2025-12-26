#!/usr/bin/env python3
import argparse
import json
import subprocess
import tempfile
import os

import random

def generate_cast(text, cast_file, width, height, char_delay, newline_delay, pause_chance=0.05, pause_duration=0.3, fast_delay=0.01):
    header = {"version": 2, "width": width, "height": height}

    with open(cast_file, 'w') as f:
        f.write(json.dumps(header) + '\n')

        time = 0.0
        fast_mode = False
        at_line_start = True

        for ch in text:
            # Check for fast mode marker at start of line
            if at_line_start and ch == '!':
                fast_mode = True
                at_line_start = False
                continue  # Skip the ! character

            if ch == '\n':
                f.write(json.dumps([round(time, 3), "o", "\r\n"]) + '\n')
                time += fast_delay if fast_mode else newline_delay
                fast_mode = False
                at_line_start = True
            else:
                f.write(json.dumps([round(time, 3), "o", ch]) + '\n')
                time += fast_delay if fast_mode else char_delay
                at_line_start = False
                # Random short pause while typing (only in normal mode)
                if not fast_mode and random.random() < pause_chance:
                    time += pause_duration

def main():
    parser = argparse.ArgumentParser(description='Generate animated terminal SVG')
    parser.add_argument('input', help='Input text file')
    parser.add_argument('output', help='Output SVG file')
    parser.add_argument('--width', type=int, default=82, help='Width in columns (default: 82)')
    parser.add_argument('--height', type=int, default=20, help='Height in lines (default: 20)')
    parser.add_argument('--char-delay', type=float, default=0.05, help='Delay per character in seconds (default: 0.05)')
    parser.add_argument('--newline-delay', type=float, default=0.5, help='Delay per newline in seconds (default: 0.5)')
    parser.add_argument('--pause-chance', type=float, default=0.05, help='Chance of random pause while typing (default: 0.05)')
    parser.add_argument('--pause-duration', type=float, default=0.3, help='Duration of random pause in seconds (default: 0.3)')
    parser.add_argument('--fast-delay', type=float, default=0.01, help='Delay for fast lines starting with ! (default: 0.01)')
    parser.add_argument('--no-cursor', action='store_true', help='Disable cursor rendering')
    parser.add_argument('--padding', type=int, help='Padding around text')
    parser.add_argument('--no-window', action='store_true', help='Disable window decorations')
    parser.add_argument('--profile', help='Terminal color profile file (e.g., green.xresources)')
    parser.add_argument('--term', default='xresources', help='Profile format: iterm2, xrdb, xresources, terminator, konsole, terminal, remmina, termite, tilda, xcfe (default: xresources)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Print the svg-term-cli command')

    args = parser.parse_args()

    with open(args.input, 'r') as f:
        text = f.read()

    with tempfile.NamedTemporaryFile(suffix='.cast', delete=False) as tmp:
        cast_file = tmp.name

    try:
        generate_cast(text, cast_file, args.width, args.height, args.char_delay, args.newline_delay, args.pause_chance, args.pause_duration, args.fast_delay)

        cmd = [
            'npx', 'svg-term-cli',
            '--in', cast_file,
            '--out', args.output,
        ]

        if not args.no_window:
            cmd.append('--window')
        if args.no_cursor:
            cmd.append('--no-cursor')
        if args.padding:
            cmd.extend(['--padding', str(args.padding)])
        if args.profile:
            profile_path = os.path.abspath(args.profile)
            cmd.extend(['--profile', profile_path, '--term', args.term])

        if args.verbose:
            print(' '.join(cmd))
        subprocess.run(cmd, check=True)
        print(f"Generated {args.output}")
    finally:
        os.unlink(cast_file)

if __name__ == '__main__':
    main()
