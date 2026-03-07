-- Allow people_count = 0 to represent a cancelled registration
ALTER TABLE marketing.signups
  DROP CONSTRAINT IF EXISTS signups_people_count_check;

ALTER TABLE marketing.signups
  ADD CONSTRAINT signups_people_count_check CHECK (people_count BETWEEN 0 AND 5);
