---
layout:     post
title:      "Deleting Github History"
date:       2018-02-04 12:00:00
author:     "Chad Baudoin"
---

I recently wanted to take a project from private to public, but I wasn't real sure what was in the history. I think I committed a few sensitive keys during development. So, I looked up how to nuke your github history and ran across this [stackoverflow post](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github) that I thought was invaluable. This is the answer that worked for me.

1. Checkout

	`git checkout --orphan latest_branch`

2. Add all the files

	`git add -A`

3. Commit the changes

	`git commit -am "commit message"`

4. Delete the branch

	`git branch -D master`

5. Rename the current branch to master

	`git branch -m master`

6. Finally, force update your repository
	
	`git push -f origin master`

[https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github)
