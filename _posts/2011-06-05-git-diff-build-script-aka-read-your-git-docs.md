--- 
layout: post
title: Git Diff Build Script (AKA read your Git docs)
categories:
- Git
tags: 
- Ant
- AWK
- Bash
- Git
- SVN
---

When working in SVN, I have a batch script I've used in the past to create "DEPLOY" and "RESTORE" folders off of diffs between branches. The script will create a "DEPLOY" folder containing all <b>added</b> and <b>modified</b> files, and a "RESTORE" folder containing all <b>modified</b> files.

The purpose of this, is to deploy a set of files to a different environment. I can just copy the "DEPLOY" folder to any number of servers.  If there is a bug that made it through QA, and we need to immediately rollback changes, we can just copy the "RESTORE" folder to all the same servers.

I just wrote a similar script for Git:  <a href="https://github.com/skratchdot/Git-Diff-Build-Script">Git-Diff-Build-Script</a>

While writing that script, I didn't read the Git docs closely enough, and missed the "git diff" <b>--diff-filter</b> parameter. Because of this, I thought I would have to use AWK to sanitize my list of files, but then I read about the <b>--diff-filter</b> parameter, and changed 2 lines of code to 1:

<u>USING AWK:</u>
    info="$(git diff origin/prod origin/dev --name-status)"
    files="$(echo "$info" | awk '$1 ~/M|A/ {print $2}')"

<u>USING diff-filter:</u>
    files="$(git diff origin/prod origin/dev --name-only --diff-filter=MA)"
