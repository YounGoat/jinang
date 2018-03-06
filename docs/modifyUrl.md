##	jinang/modifyUrl

*   string __modifyUrl__( string *urlname*, Object *options* )
    Modify the URL and return a new one.

*   string __modifyUrl.pathname__( string *urlname*, string *pathname*, char *flag* = 'w')  
    Modify the pathname part of the URL.  
    *flag* valued with `'a'` means append, with `'w'` means write (wholly replace).

*   string __modifyUrl.protocol__( string *urlname*, string *protocol* )  
    Modify the protocol part of the URL.
    
*   string __modifyUrl.query__( string *urlname*, string|Object *query*, char *flag* )  
    Modify the query part of the URL.  
    *flag* valued with `'a'` means append, with `'w'` means write (wholly replace).
