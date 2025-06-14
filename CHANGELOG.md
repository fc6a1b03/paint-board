# 1.5.7

### Feat

- add fullscreen

# 1.5.6

### Feat

- draw
  - basic / material / multi color: add line type connfig (solid / dashed / dotted)

### refactor
  - restructure core code directory

# 1.5.5

### Feat

- i18n: add zh-tw(中文繁体), ja(日本語), ko(한국어)

# 1.5.4

### Feat

- add eraser config

# 1.5.3

### Feat

- upload image
  -  add image segmentation 

# 1.5.2

### Feat

- add download image size config

# 1.5.1

### Feat

- add PWA

### CI

- integrate Dockerfile with GitHub Actions for GitHub Pages deployment

# 1.5.0

### Feat

- save as image supports custom configurations. Rotate, Scale, Crop
- add transformers.js
- support removing background for uploading images (browser needs to support WebGPU)

# 1.4.1

### Feat

- update some styles
- remove autodraw

# 1.4.0

### Feat

- add canvas background image

# 1.3.1

### Feat

- update font family

### Docs

- README adds browser support

# 1.3.0

### Feat

- Drawing
  - Provides a variety of common shapes drawing, support for multiple endpoints line segments and arrows, and support for the configuration of the border and fill styles.
  - Added Google AutoDraw feature to Basic Drawing.
- Font
  - Supports font drawing by double-clicking.
  - Add font style configuration.
- Board
  - The drawing board supports customized width and height configurations.
  - Added Guide Line drawing feature.
- Optimisation
  - All fonts support i18n.
  - All inputs can now display content in real time.
  - Adjusting Tool Panel Styles.

### Fix

- Fix zoom progress component initialization error.
- Fix the error of initializing the display of the background color of the drawing board.

# 1.2.1

### Fix

- fix bottom operation tooltip display

# 1.2.0

### Feat

- add docker support

### Docs

- add CONTRIBUTING.md
- add Issues template

# 1.1.0

### Feat

- dynamic loading clarity

# 1.0.0

### Feat

- Refactoring with Fabric.js
- Adjust the operation panel style layout, add multi-functional menus to improve the user experience
- Increased number of brush styles to 12 and introduced multiple customizations
- Optimized layer settings from layer list to single element layer settings. Includes moving layers up, moving layers down, moving to top layer and moving to bottom layer
- Add new image upload function, also support layer filter configuration, add more effects to the painting content
- Introduced text drawing function, user can freely configure fonts
- Add rotation operation and transparency configuration in selection mode
- Introduces multi-file configuration, allowing users to easily switch between multiple canvases, each with customizable titles, additions, deletions, and upload and download features
- Supports multi-end operation, mobile users can zoom and drag the canvas by two-finger
- Add canvas zoom feature, users can freely adjust the canvas size as needed. And add background color and transparency configuration

# 0.2.8 (2023-12-03)

### Feat

- add microsoft clarity

# 0.2.7 (2023-12-03)

### Feat

- add clean modal
- Text rendering adds color
- Change the material loading text

# 0.2.6 (2023-09-29)

### Fix

- static file path error

# 0.2.5 (2023-09-24)

### Fix

- single layer deleted error

# 0.2.4 (2023-09-23)

### Fix

- issue#11
- click mask doesn't close

# 0.2.3 (2023-02-16)

### Feat

- Add i18n

# 0.2.2 (2023-01-22)

### Chore

- Add styleLint
- Deploy changed to github actions

# 0.2.1 (2022-12-19)

### Feat

- Add free draw effect, multiple effects, fluorescent、multicolor、crayon、bubbles、spray

# 0.2.0 (2022-12-06)

### Feat

- Add dclick drawing text
- Add select mode, can zoom, move and delete(Backspace) elements

### Chore

- Deploy changed to gh-pages
- Add lodash

# 0.1.0 (2022-11-14)

### Feat

- Add free draw, eraser
- Add drawing board drag and drop
- Add multi layer, can add, delete and sort
- Add undo, redo, clean, save
