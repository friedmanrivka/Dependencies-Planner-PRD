
CREATE TRIGGER validate_group_id_trigger
BEFORE INSERT OR UPDATE ON affectedgroups
FOR EACH ROW EXECUTE FUNCTION validate_group_id();

INSERT INTO affectedgroups (requestid, groupid, status,tsize)
VALUES (2,2,'not In Q','small')

select *
from affectedgroups