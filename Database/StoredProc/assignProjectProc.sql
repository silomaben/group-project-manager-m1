CREATE PROCEDURE assignProjectProc
    @project_id VARCHAR(200),
    @userId VARCHAR(200)
AS
BEGIN
    UPDATE usersTable
    SET assignedProject = @project_id
    WHERE id = @userId;
END