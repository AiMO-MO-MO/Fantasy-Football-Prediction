DROP TABLE CompleteDataSetFinal;

CREATE TABLE CompleteDataSetFinal(
	Id INTEGER PRIMARY KEY,
	Week REAL,
	Name VARCHAR(50),
	Position VARCHAR(5),
	Year INTEGER,
	Game VARCHAR(20),
	FantasyPoints DOUBLE PRECISION,
	PassingYards DOUBLE PRECISION,
	PassingTDs DOUBLE PRECISION,
	Ints INTEGER,
	RushAttempts INTEGER,
	RushYards INTEGER,
	Fumbles INTEGER,
	RushTDs INTEGER,
	Receptions DOUBLE PRECISION,
	ReceivingYards DOUBLE PRECISION,
	ReceivingTDs DOUBLE PRECISION
);

-- Select entire data from database
SELECT * FROM CompleteDataSetFinal
LIMIT 10;

-- Retrieve all records for the WR(Wide Receiver) position for the year 2000
SELECT *
FROM CompleteDataSetFinal
WHERE Position = 'WR' AND Year = 2020;

-- Retrieve total fantasy points for each year
SELECT Year, SUM(FantasyPoints) AS TotalFantasyPoints
FROM CompleteDataSetFinal
GROUP BY Year;

-- Total Touchdowns by Position

--SELECT Position, SUM(PassingTDs + RushTDs + ReceivingTDs) AS TotalTouchdowns
--FROM CompleteDataSetFinal
--GROUP BY Position;

SELECT Position, 
       SUM(COALESCE(PassingTDs, 0) + COALESCE(RushTDs, 0) + COALESCE(ReceivingTDs, 0)) AS TotalTouchdowns
FROM CompleteDataSetFinal
GROUP BY Position;

-- Players with Most Receptions
SELECT Name, Receptions
FROM CompleteDataSetFinal
WHERE Receptions IS NOT NULL
ORDER BY Receptions DESC
LIMIT 10;  -- Top 10 players by Reception

-- Average Fantasy Points by Position
SELECT Position, AVG(FantasyPoints) AS AvgFantasyPoints
FROM CompleteDataSetFinal
GROUP BY Position;
