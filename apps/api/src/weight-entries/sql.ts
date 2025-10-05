const SELECT = `
    SELECT * 
    FROM WeightEntry
    ORDER BY date_recorded ASC
`;

const CREATE = `
    INSERT INTO WeightEntry (weight, date_recorded) 
    VALUES (?, ?) 
`;

const UPDATE = `
    UPDATE WeightEntry
    SET
        weight = ?,
        date_recorded = ?
    WHERE id = ?
`;

const DELETE = `
    DELETE FROM WeightEntry
    WHERE id = ?
`;

export { SELECT, CREATE, UPDATE, DELETE };
