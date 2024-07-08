
CREATE OR REPLACE FUNCTION validate_group_id()
RETURNS TRIGGER AS $$
DECLARE
    group_exists BOOLEAN;
BEGIN
    BEGIN
        -- Check if the group ID exists in the 'group' table in the 'Group' database
        SELECT EXISTS (
            SELECT 1
            FROM dblink('dbname=Group user=postgres password= Bidhsyr66333!!!', 
                        'SELECT id FROM "group" WHERE id = ' || NEW.groupid) 
            AS t(id INT)
        ) INTO group_exists;
    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'Error in dblink connection: %', SQLERRM;
    END;

    IF NOT group_exists THEN
        RAISE EXCEPTION 'Invalid group ID % in productmanager', NEW.groupid;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE EXTENSION IF NOT EXISTS dblink;


