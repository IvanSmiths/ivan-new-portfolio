CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`desktop_url` text NOT NULL,
	`mobile_url` text NOT NULL,
	`alt` text NOT NULL
);
