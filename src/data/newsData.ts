interface News {
  title: string;
  content: string;
}

export interface NewsOfADate extends News {
  date: string;
}

// Exported function for better testability
export function getNewsData(): Map<string, News> {
  return newsData;
}

export function getAllNewsOrderedByDate(): Array<NewsOfADate> {
  const theData = getNewsData();
  return Array.from(theData.entries())
    .map(([date, entry]) => ({
      date,
      ...entry,
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Sample data (replace with real database later)
const newsData: Map<string, News> = new Map([
  ['2019-03-25', {
    title: 'v0.5.0',
    content: `
#### 🌟 New Features

##### Image

One of the most wanted features has now been implemented: With the new version 0.5.0 you can add pictures to your Bonsai Writer documents.

You can use the structure menu in the menu bar or the context menu in the main text area. Or you can copy an image from another program and paste it into your document using the clipboard.

Pictures can be labelled with a title. To do this you use the Metadata view.

JPEGs often contain rotation information, which Bonsai Writer evaluates correctly so that the sky in your photos is at the top and the sea at the bottom.

Currently, the image formats PNG, JPEG, GIF and BMP are supported. Even animated images can be inserted as PNG or GIF. But beware! We haven't added a way to stop them yet! 🤪

#### 🐞 Bug Fixes

- A code block is no longer split when the title is changed.
- The theme can now be changed again under Windows and Linux.
- The menu entry "Recently used documents" is no longer displayed under Windows and Linux.

#### 💅 User Interface / Design

- The icons in the metadata view are now left-justified.
- Minor adjustments to the outline view.
- The input elements in the hyperlink popup and in the metadata view have been unified.
- The order of the menu entries for changing the structure has been unified in the structure menu of the menu bar and in the context menu of the main text area.

#### 🌻 Improvements

- Tooltips are now available to help you work with hyperlinks.
- When copying headings and block citations, the structure information is retained.
`,
  }],
  ['2019-04-09', {
    title: 'v0.5.1',
    content: `
#### 🐞 Bug Fixes

This version fixes a bug that caused the Bonsai Writer file to get bigger and bigger when saving a Bonsai Writer document several times, because the previous version was kept internally.

Files that were saved multiple times with version 0.4.0 - 0.5.0 should be copied and pasted into a new document.
`,
  }],
  ['2019-04-16', {
    title: 'v0.6.0',
    content: `
#### 🌟 New Features

##### Export-Plug-ins

Bonsai Writer's export capabilities can now be extended using plug-ins. Such a
PlugIn must conform to the _Bonsai Writer Plugin Interface Specification_, which
will be released shortly. Every developer gets the possibility to develop a
Bonsai Writer Export PlugIn for _his_ or _her_ desired format. The end user
simply puts the plug-in into the \`PlugIns\` folder in the user data folder of the
Bonsai Writer application (under macOS this is e.g.
\`/Users/{username}/Library/Application Support/Bonsai Writer/PlugIns/\`),
restarts the application and the new export option is available via the
application menu.

#### 🐞 Bug Fixes

- The "Edit" menu is now correctly translated to German.
- When dragging and dropping in lists, the display line no longer flickers.
- The cursor does not jump back when changing the width of the outline view.
- Usage of the Tab key no longer causes the focus to change to another element.

#### 💅 User Interface / Design

- The metadata view is only displayed if a block is currently selected for which
  metadata can be edited; currently these are image and code block.
- The metadata view now displays the data of a selected block until another
  block or other control element in the window (e.g. the document title) becomes
  the text input target.
- The headings submenu of the block handle now opens when the user moves the
  pointer to the _Headings_ entry. Until now, an extra click was necessary for
  this.

##### Presentation in the editor

- Images now have a border and are positioned left-aligned.
- Images are now scaled to a maximum size if they are too wide or too high.
- The code block title is now positioned left-aligned below the code block.
- The color and radius of the code block have been adjusted.

#### 🌻 Improvements

- The performance when opening a new window has been improved.
- A file with the license texts of used modules of other developers is now
  bundled with the app.
`,
  }],
  ['2019-05-07', {
    title: 'v0.7.0',
    content: `
#### 🌟 New Features
For list elements, the handle and structure menus now offer the possibility to increase the list level along with its child elements. For the *first* list element of a list, you cannot increase the list level, as this would not be useful.

#### 🐞 Bug Fixes
- When opening a BWT file, the window title is no longer "Bonsai Writer", instead the file name is displayed.
- Copying and pasting after selecting the entire document no longer leads to an error.
- Changing the window height no longer causes the font to flicker.

#### 💅 User Interface / Design
The colors in the outline view have been revised.

#### 🌻 Improvements
 - If an image is selected that is in a list, pressing Enter inserts a new list element into the list right after the image.
- If you click under an image that is at the end of the document, a new paragraph is created there.
- For failed exports (via plug-in) a message now appears, informing the user that the export failed.
- The help menu now contains an additional link to the license terms on the Bonsai Writer website. The entry to activate the developer tools has been removed.
- The context menu shows the options to change the text structure only when opened in the text area.

#### Bonsai Writer Plug-ins
The plug-in interface has been extended by a call for the first setup (initialization). A Bonsai Writer plug-in can therefore perform necessary steps before the first use – e.g. loading required components.
`,
  }],
  ['2019-05-28', {
    title: 'v0.8.0',
    content: `
#### 🌟 New Features
- The user can now decide whether Bonsai Writer should inform him about updates or not. He can control the behavior in the update dialog or anytime via the Help menu.
- When starting Bonsai Writer for the first time, the user is presented with some hints for working with Bonsai Writer. This should help new users to find their way around and to get to know the special interaction possibilities of Bonsai Writer.

#### 🐞 Bug Fixes
In the "unsaved changes" dialog, now the file name is used, if the document has already been saved before.

#### 💅 User Interface / Design
- The color design of the handles has been adapted so that they are now also visible on very bright adjusted monitors.
- A banner with the word "Alpha" is now visible in the upper right corner of the document window to show users that the software is an Alpha version.

#### 🌻 Improvements
- The update notification now appears in the form of a dialog window.
- The menu item for the PDF export now presents a *Coming soon* hint. The previous ( prototypical) PDF export has been removed and will soon be replaced by a much better, completely new implementation.
`,
  }],
  ['2019-06-07', {
    title: 'v0.8.1',
    content: `
#### 🐞 Bug Fixes

Opening a document from the Finder (macOS) oder Explorer (Windows) or unter macOS via the „Recent Documents“ menu no longer leads to creating a new document, but opens the chosen document as desired.
`,
  }],
]);
