# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0-alpha.2](https://github.com/amalto/platform6-web-components/compare/@platform6/components@1.1.0-alpha.1...@platform6/components@1.1.0-alpha.2) (2020-12-22)


### Bug Fixes

* **p6-field:** add a mark when input is mandatory ([13aaca4](https://github.com/amalto/platform6-web-components/commit/13aaca4a5bc8ed3cb3dd4db5af8ea68b5076eb84)), closes [#7](https://github.com/amalto/platform6-web-components/issues/7)


### Features

* **p6-modal:** emit an event when the user try to close the modal ([13c142e](https://github.com/amalto/platform6-web-components/commit/13c142e83c3dbcc77db265795cb73b3565f95546))





# [1.1.0-alpha.1](https://github.com/amalto/platform6-web-components/compare/@platform6/components@1.1.0-alpha.0...@platform6/components@1.1.0-alpha.1) (2020-12-21)


### Bug Fixes

* **p6-action:** set the background color to transparent ([0d59493](https://github.com/amalto/platform6-web-components/commit/0d59493267d33aa28cb3459a80c992528076dece)), closes [#8](https://github.com/amalto/platform6-web-components/issues/8)
* **p6-grid:** fixes the style of the selected and/or hovered lines ([4ede3bf](https://github.com/amalto/platform6-web-components/commit/4ede3bf7c0411c89615bd625567693f1cd1e3892)), closes [#11](https://github.com/amalto/platform6-web-components/issues/11)
* **p6-grid:** the configured sort is not applied on loading ([372d8ef](https://github.com/amalto/platform6-web-components/commit/372d8ef8ca6e563fd8e4e247ee6e56545d728cbe))
* **p6-tabs:** increase the max-width of a tab ([c106103](https://github.com/amalto/platform6-web-components/commit/c1061032747a0edb270bf12cf3e89decb34b4272))
* **p6-tabs:** tabs can wrap onto multiples lines ([edd055e](https://github.com/amalto/platform6-web-components/commit/edd055e8f824862b0c216930d84a92d2607af8a0)), closes [#9](https://github.com/amalto/platform6-web-components/issues/9)
* **p6-tabs:** updates the style of the tab bottom border ([cdb4a81](https://github.com/amalto/platform6-web-components/commit/cdb4a8150a458d3e74009cda68e9e4eb63e8604a))
* update the style of the closing button ([c328bdd](https://github.com/amalto/platform6-web-components/commit/c328bdd3dd720dc5302d8ced489eae9ccd7f34dc))


### Code Refactoring

* **p6-tabs:** refactoring tabs to fix some UI issues ([5373b66](https://github.com/amalto/platform6-web-components/commit/5373b660367a3778e4ac1ed6b5f812f36dbd6037)), closes [#10](https://github.com/amalto/platform6-web-components/issues/10)


### Features

* add p6-close component ([265db6d](https://github.com/amalto/platform6-web-components/commit/265db6dfa075350a7b310d0442c0d018223cb7e9))
* **grid:** add defaultDefinitions property ([792d8c6](https://github.com/amalto/platform6-web-components/commit/792d8c630817d257a3ded596a7651af0f54a3782)), closes [#12](https://github.com/amalto/platform6-web-components/issues/12)


### BREAKING CHANGES

* **p6-tabs:** The p6-tab component was rewritten, now it is only used for displaying the tab. for its content, the p6-tab-content component must be used.
