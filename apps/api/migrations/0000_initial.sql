-- Migration number: 0000 	 2025-10-08T15:05:23.955Z
CREATE TABLE IF NOT EXISTS WeightEntry 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    weight DOUBLE NOT NULL, 
    date_recorded VARCHAR(8000) NOT NULL
);
-- Migration ends here