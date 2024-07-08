CREATE TRIGGER validate_group_id_trigger
BEFORE INSERT OR UPDATE ON productmanager
FOR EACH ROW EXECUTE FUNCTION validate_group_id();


INSERT INTO productmanager (email, name, groupid) VALUES 

('new.manager@example2.com', 'New Manager', 2),
('new.manager@example3.com', 'New Manager', 3),
('new.manager@example4.com', 'New Manager', 4),
('new.manager@example5.com', 'New Manager', 5),
('new.manager@example6.com', 'New Manager', 6),
('new.manager@example7.com', 'New Manager', 7),
('new.manager@example8.com', 'New Manager', 8),
('new.manager@example9.com', 'New Manager', 9),
('new.manager@example10.com', 'New Manager', 10),
('new.manager@example11.com', 'New Manager', 11),
('new.manager@example12.com', 'New Manager', 12),
('new.manager@example13.com', 'New Manager', 13),
('new.manager@example14.com', 'New Manager', 14),
('new.manager@example15.com', 'New Manager', 15),
('new.manager@example16.com', 'New Manager', 16),
('new.manager@example17.com', 'New Manager', 17),
('new.manager@example18.com', 'New Manager', 18);
SELECT * FROM productmanager;