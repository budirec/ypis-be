create user ypuser with encrypted password 'secret@Pass';
CREATE DATABASE yp;
grant all privileges on database yp to ypuser;
ALTER DATABASE yp OWNER to ypuser;