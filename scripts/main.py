#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import sys
import init
import remove

def main(argv = None):
    parser = argparse.ArgumentParser(description='CoCass platform Python monitoring script. If this is the first time you use this script, launch it without arguments and follow the setup.')

    parser.add_argument('--rm', action="store_true", dest="remove", help="remove the docker-machine and leave the community")

    args = parser.parse_args()

    if args.remove:
        remove.main()
    else:
        init.main()

if __name__ == "__main__":
    sys.exit(main())
