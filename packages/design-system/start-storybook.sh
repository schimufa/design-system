#!/bin/bash
rm -rf node_modules/.cache storybook-static
pnpm install
pnpm storybook 