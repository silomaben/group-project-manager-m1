CREATE OR ALTER PROCEDURE registerUsersProc(@id VARCHAR(200), @full_name VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(id, full_name, email, password) VALUES(@id, @full_name, @email, @password)
END

SELECT * FROM usersTable;