-- Select entire data from database
SELECT * FROM CompleteDataSetFinal
LIMIT 10;

-- Select entire data from table RASDF_data
SELECT * FROM RASDF_data
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

-- Get Name, School and Total Fantasy Points from two tables
SELECT
  RDF.Name,
  RDF.School,
  SUM(CSDF.FantasyPoints) AS TotalFantasyPoints
FROM
  RASDF_data RDF
JOIN
  CompleteDataSetFinal CSDF ON RDF.Name = CSDF.Name
GROUP BY 
  RDF.Name, RDF.School
ORDER BY
  TotalFantasyPoints DESC;

-- Count the number of players from each school who participated in a game in 2023
SELECT
    RDF.School,
    COUNT(DISTINCT RDF.Name) AS NumberOfPlayers
FROM
    RASDF_data RDF
JOIN
    CompleteDataSetFinal CDSF ON RDF.Name = CDSF.Name
WHERE
    CDSF.Year = 2023
GROUP BY
    RDF.School
ORDER BY
    NumberOfPlayers DESC;
