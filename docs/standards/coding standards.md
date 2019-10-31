**Except where noted below, all coding should follow the CodeIgniter 3.1 style
guide located at https://codeigniter.com/user_guide/general/styleguide.html**

Globals:
Global variables should not be used except to define environment variables used
for security.

Database Queries:
To further prevent SQL injections, queries should be built with individual
keyword statements, and put together with the CodeIgniter get() function.
Example:

$this->db->select('column_name');
$this->db->from('table');
$this->db->where('condition');
return $this->db->get();

**NOT**
return $this-db-query("SELECT column_name FROM table WHERE condition");
