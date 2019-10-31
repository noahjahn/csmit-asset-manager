# IT Asset Manager - Coding Standards

The IT Asset Manager is coded using the PHP-based CodeIgniter framework. Except where noted below, all coding styles should follow the CodeIgniter 3.1 style
guide located at https://codeigniter.com/user_guide/general/styleguide.html

These standards include, but are not limited to:

* UTF-8 Encoding
* Uppercase-First naming for Class files.
* lowercase naming for other files.
* Omitting the PHP closing tag on a PHP document. (may cause errors with framework)
* Short and lowercase variable names.
* Uppercase CONSTANTS
* Uppercase TRUE, FALSE, and NULL
* Logical operators should be "OR" and "&&", and "!" should be spaced on both sides
* Use === and !=== for strict return checking.
* No whitespace before PHP tag.
* Unix line breaks (For Windows developers)
* Allman style braces
* Localized text using language files
* Use isset() when checking variables.
* One statement per line
* Use function argument defaults when possible

## Globals:
Global variables should not be used anywhere in the system except to define environment variables (located in the `.env` file at the root of the application) used for security.

## Database Queries:
To prevent any potential SQL injections, queries should be built with individual
keyword statements. These statement are put together with the CodeIgniter get() function.
Example:

```
$this->db->select('column_name');
$this->db->from('table');
$this->db->where('condition');
return $this->db->get();
```

**NOT**
```
return $this-db-query("SELECT column_name FROM table WHERE condition");
```
