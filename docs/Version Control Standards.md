# IT Asset Manager - Version Control Standards

## Git
Application files for this IT Asset Manager is maintained using Git, a distributed version control system. The repository for this project is currently located at https://github.com/noahjahn/csmit-asset-manager

For more details on how to download and use Git, refer to the Git-handbook at: https://guides.github.com/introduction/git-handbook/


## Workflow
*Master Branch*: Should always reflect what is currently in production.

*Develop Branch*: Should always reflect what is currently in staging.

*Branching new features*
* Each new feature should have it's own **Branch** from *Develop*.
* The standard naming convention for these branches is *Feature/...*.
* Once a feature is complete, **Commit** all changes to *Feature/...* branch.
* **Checkout** your local *Develop* branch.
* **Pull** to update *Develop*.
* **Merge** *Feature/...* into *Develop*.
* **Resolve** any conflicts between your feature, and the updated "Develop" branch.
* Once all conflicts are resolved, **Push** local "Develop" branch to origin/Develop.
  * Increase software version number +0.1
* Initiate a **Pull Request** from *Master* to merge new version into production site.
  * Increase software version number +1.0
