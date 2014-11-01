# URLs

**/v2/bugs**

```
SELECT * FROM bugs;
```

**/v2/users**

```
SELECT id, first_name || ' ' || last_name as name FROM users WHERE first_name <> '';
```

**/v2/bugs/new**

```
INSERT INTO bugs (title, status, assignedto) VALUES ('{{title}}', '{{status}}', {{assignedto}});
```

**/v2/bug**

```
SELECT b.id, b.title, b.status, u.first_name || ' ' || u.last_name as name, to_char(b.created_at, 'Month DD, YYYY') as created_at from BUGS b INNER JOIN users u on b.assignedto = u.id WHERE b.id = {{id}} LIMIT 1;
```