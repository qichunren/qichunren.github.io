========================
jWYSIWYG 0.93 User Manual
========================



===========
Quick Start
===========

The following code creates a jWYSIWYG editor with the default options::

    <script type="text/javascript" src="jquery.wysiwyg.js"></script>
    <script type="text/javascript">
    $(function() {
        $('#wysiwyg').wysiwyg();
    });
    </script>

    <textarea id="wysiwyg"></textarea>


Activating Hidden Controls
--------------------------

Toolbar buttons are selected with the ``controls`` configuration option::

    $('#wysiwyg').wysiwyg({
        controls: {
            strikeThrough: { visibile: true },
            underline: { visible: true },
            subscript: { visible: true },
            superscript: { visible: true }
        }
    });

A full list of available ``controls`` options is available in ____.


Adding Custom Controls
----------------------

Custom controls can also be specified with the ``controls`` option::

    $('#wysiwyg').wysiwyg({
        controls: {
            alertSep: { separator: true },
            alert: {
                visible: true,
                exec: function() { alert('Hello World'); },
                className: 'alert'
            }
        }
    })


Styling the Content Inside the Editor
-------------------------------------

To apply a CSS stylesheet to the content inside the editor, use the ``css`` configuration option::

    $('#wysiwyg').wysiwyg({
        css: 'editor.css'
    });

The editor will not inherit the style of the containing page anyway, you must specify a CSS file to apply to it.


Clear the Editor
----------------

To clear the editor at any time::

    $('#wysiwyg').wysiwyg('clear');


Insert an Image
---------------

When the #insertImage link is clicked, insert an image inline at the current cursor location in the editor::

    $('a[href="#insertImage"]').click(function() {
        $('#wysiwyg').wysiwyg('insertImage', 'img/hourglass.gif');
    });


Insert an Image with Attributes
-------------------------------

Add some additional attributes to the image, as well::

    $('a[href="#insertImage"]').click(function() {
        $('#wysiwyg').wysiwyg('insertImage', 'img/hourglass.gif', { 'class': 'myClass', 'className': 'myClass' });
    });

Note that the class attribute is added twice, because the ``class`` DOM attribute is recognized on IE but not on Firefox, and the ``className`` attribute is recognized on Firefox but not on IE.


===============================
Available Configuration Options
===============================

Additional configuration options are specified by passing a javascript object to the wysiwyg() function when it is first called on a textarea. Available keys are:

``html``
    A string containing the source HTML code used inside the editor's iframe. This is a template where ``STYLE_SHEET`` and ``INITIAL_CONTENT`` are later replaced by the appropriate code for the editor instance, so those two strings must be present in this option.

``css``
    A string containing the path to a CSS file which will be included in the editor's iframe.

``debug``
    A boolean, enabling or disabling debugging.

``autoSave``
    A boolean. If ``true``, the editor will copy its contents back to the original textarea anytime it is updated. If ``false``, this must be done manually.

``rmUnwantedBr``
    A boolean. If ``true``, the editor will not add extraneous ``<br>`` tags.

``brIE``
    A boolean. If ``true``, a ``<br />`` will be inserted for a newline in IE.

``controls``
    A javascript object specifying control buttons and separators to include in the toolbar. This can consist of built-in controls and custom controls. Controls are specified as key, value pairs in the javascript object, where the key is the name of the control and the value is another javascript object with a specific signature.
    
    The signature of a control object looks like this::
    
        {
            // If true, this object will just be a vertical separator bar,
            // and no other keys should be set.
            separator: { true | false },
            
            // If false, this button will be hidden.
            visible: { true | false },
            
            // Tags to use to wrap the selected text when this control is
            // triggered.
            tags: ['b', 'strong'],
            
            // CSS classes to apply to selected text when this command is
            // triggered.
            css: {
                textAlign: 'left',
                fontStyle: 'italic',
                ...
            },
            
            // Function to execute when this command is triggered. If this
            // key is provided, CSS classes/tags will not be applied, and
            // any built-in functionality will not be triggered.
            exec: function() { ... },
        }
    
    If you wish to override the default behavior of built-in controls, you can do so by specifying only the keys which you wish to change the behavior of. For example, since the ``strikeThrough`` control is not visibly by default, to enable it we only have to specify::
    
        strikeThrough: { visible: true }
    
    Additionally, custom controls may be specified by adding new keys with the same signature as a control object. For example, if we wish to create a ``quote`` control which creates ``<blockquote>`` tags, we could do specify this key::
    
        quote: { visible; true, tags: ['blockquote'], css: { class: 'quote', className: 'quote' } }
    
    Note that when defining custom controls, you will most likely want to add additional CSS to style the resulting toolbar button. The CSS to style a button looks like this::
    
        div.wysiwyg ul.panel li a.quote {
            background: url('quote-button.gif') no-repeat 0px 0px;
        }
    
    Available built-in controls are:
    
    * ``bold``: Make text bold.
    * ``italic``: Make text italic.
    * ``strikeThrough``: Make text strikethrough.
    * ``underline``: Make text underlined.
    * ``justifyLeft``: Left-align text.
    * ``justifyCenter``: Center-align text.
    * ``justifyRight``: Right-align text.
    * ``justifyFull``: Justify text.
    * ``indent``: Indent text.
    * ``outdent``: Outdent text.
    * ``subscript``: Make text subscript.
    * ``superscript``: Make text superscript.
    * ``undo``: Undo last action.
    * ``redo``: Redo last action.
    * ``insertOrderedList``: Insert ordered (numbered) list.
    * ``insertUnorderedList``: Insert unordered (bullet) list.
    * ``insertHorizontalRule``: Insert horizontal rule.
    * ``createLink``: Create a link from the selected text, by prompting the user for the URL.
    * ``insertImage``: Insert an image, by prompting the user for the image path.
    * ``h1mozilla``: Make text an h1 header, Mozilla-specific.
    * ``h2mozilla``: Make text an h2 header, Mozilla-specific.
    * ``h3mozilla``: Make text on h3 header, Mozilla-specific.
    * ``h1``: Make text an h1 header, non-Mozilla-specific.
    * ``h2``: Make text an h2 header, non-Mozilla-specific.
    * ``h3``: Make text an h3 header, non-Mozilla-specific.
    * ``cut``: Cut selected text.
    * ``copy``: Copy selected text.
    * ``paste``: Paste from clipboard.
    * ``increaseFontSize``: Increase font size.
    * ``decreaseFontSize``: Decrease font size.
    * ``html``: Show the original textarea with HTML source. When clicked again, copy the textarea code back to the jWYSIWYG editor.
    * ``removeFormat``: Remove all formatting.
    * ``insertTable``: Insert a table, by prompting the user for the table settings.


``messages``
    A javascript object with key, value pairs setting custom messages for certain conditions. Available keys are:
    
    * ``nonSelection`` : Message to display when the Create Link button is pressed with no text selected.


============================
Available Built-In Functions
============================

Built-in editor functions can be triggered manually with the .wysiwyg() call.

====================================
Customizing the Editor Look and Feel
====================================



============
How it Works
============

When jWYSIWYG is called on a textarea, it does the following things:

1. Creates an additional container div to encapsulate the new editor.
2. Hides the existing textarea.
3. Creates an iframe inside the container div, populated with editor window and toolbar.
4. When ``saveContent()`` is called, copy its content to existing textarea.
5. Listen for ``submit`` event of closest form to apply ``saveContent()`` before form submittion.

====================
Additional Resources
====================

Look at http://akzhan.github.com/jwysiwyg/examples/
