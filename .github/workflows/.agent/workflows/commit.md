---
description: Pushing changes to Github
---

When work is committed and pushed to Github, the application will automatically deploy to the production environment.

When this commit workflow is triggered, first remove any AI slop that was added to the project by calling /remove-ai-slop.  Also make sure secrets are never committed to the repo.


Then run the eslint and prettier on the application and fix any issues.  

Then run all of the tests.  Ensure any new code written as 80%+ code coverage added.

If all tests are passing, and the app is building without errors, only then can you commit the changes to github, with a short git commit message describing the changes.  

Before pushing to github, confirm the application still builds and tests still pass.  If no further changes are needed to be made, then you may push the changes to github, and summarize to the user what you did along with what the git message was.

If the tests are not passing or the build is failing, you cannot push the changes until those tests have been fixed and we have a successful build.