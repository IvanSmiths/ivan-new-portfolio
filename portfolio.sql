PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		);
INSERT INTO __drizzle_migrations VALUES(NULL,'f9a35656629401fb60c8140c548bc3972a8730ca4a5cad6b8279cf58f739d3f7',1716054005703);
CREATE TABLE IF NOT EXISTS `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`desktop_url` text NOT NULL,
	`mobile_url` text NOT NULL,
	`alt` text NOT NULL
, `is_horizontal` integer DEFAULT false);
INSERT INTO photos VALUES(1,'2024-05-18 17:52:01','https://ik.imagekit.io/ivansmiths/desktop/photo-19_wsf8va.jpg?updatedAt=1716226118812','https://ik.imagekit.io/ivansmiths/mobile/photo-19_dumgui.jpg?updatedAt=1716226247291','cat under a car (he is fine)',0);
INSERT INTO photos VALUES(2,'2024-05-18 18:50:34','https://ik.imagekit.io/ivansmiths/desktop/photo-18_dfruok.jpg?updatedAt=1716226100986','https://ik.imagekit.io/ivansmiths/mobile/photo-18_mezlt8.jpg?updatedAt=1716226249052','cat staring at camera',0);
INSERT INTO photos VALUES(3,'2024-05-18 18:51:46','https://ik.imagekit.io/ivansmiths/desktop/photo-17_ds6y68.jpg?updatedAt=1716226103008','https://ik.imagekit.io/ivansmiths/mobile/photo-17_u01fgj.jpg?updatedAt=1716226241678','an elegant looking cat',0);
INSERT INTO photos VALUES(4,'2024-05-18 18:52:39','https://ik.imagekit.io/ivansmiths/desktop/photo-16_jw4j3o.jpg?updatedAt=1716226095330','https://ik.imagekit.io/ivansmiths/mobile/photo-16_th5ysy.jpg?updatedAt=1716226254902','a very curious cat',0);
INSERT INTO photos VALUES(5,'2024-05-18 18:53:29','https://ik.imagekit.io/ivansmiths/desktop/photo-15_tpxcmd.jpg?updatedAt=1716226104824','https://ik.imagekit.io/ivansmiths/mobile/photo-15_cq5cmy.jpg?updatedAt=1716226256581','a cat, posing',0);
INSERT INTO photos VALUES(6,'2024-05-18 18:54:14','https://ik.imagekit.io/ivansmiths/desktop/photo-14_ebrkge.jpg?updatedAt=1716226112972','https://ik.imagekit.io/ivansmiths/mobile/photo-14_dwbyz7.jpg?updatedAt=1716226253218','a cat, sleeping',0);
INSERT INTO photos VALUES(7,'2024-05-18 18:55:02','https://ik.imagekit.io/ivansmiths/desktop/photo-13_i6krnd.jpg?updatedAt=1716226117049','https://ik.imagekit.io/ivansmiths/mobile/photo-13_qrh8xg.jpg?updatedAt=1716226251334','security cameras',0);
INSERT INTO photos VALUES(8,'2024-05-18 19:02:19','https://ik.imagekit.io/ivansmiths/desktop/photo-11_pluaqp.jpg?updatedAt=1716226110984','https://ik.imagekit.io/ivansmiths/mobile/photo-11_risgnw.jpg?updatedAt=1716226239736','a cat, hiding',0);
INSERT INTO photos VALUES(9,'2024-05-18 19:02:19','https://ik.imagekit.io/ivansmiths/desktop/photo-12_lw0yyq.jpg?updatedAt=1716226120756','https://ik.imagekit.io/ivansmiths/mobile/photo-12_fklggc.jpg?updatedAt=1716226243434','a cat with a beach background',0);
INSERT INTO photos VALUES(10,'2024-05-18 19:03:12','https://ik.imagekit.io/ivansmiths/desktop/photo-10_nyh13v.jpg?updatedAt=1716226125396','https://ik.imagekit.io/ivansmiths/mobile/photo-10_vasjxh.jpg?updatedAt=1716226245276','a statue',0);
INSERT INTO photos VALUES(11,'2024-05-18 19:05:16','https://ik.imagekit.io/ivansmiths/desktop/photo-7_upqubg.jpg?updatedAt=1716226115040','https://ik.imagekit.io/ivansmiths/mobile/photo-7_gbqcqr.jpg?updatedAt=1716226224533','a statue of a child',0);
INSERT INTO photos VALUES(12,'2024-05-18 19:06:11','https://ik.imagekit.io/ivansmiths/desktop/photo-6_rlighg.jpg?updatedAt=1716226089658','https://ik.imagekit.io/ivansmiths/mobile/photo-6_jc2a5j.jpg?updatedAt=1716226232483','a statue playing the flute',0);
INSERT INTO photos VALUES(13,'2024-05-18 19:06:55','https://ik.imagekit.io/ivansmiths/desktop/photo-5_yhweno.jpg?updatedAt=1716226093600','https://ik.imagekit.io/ivansmiths/mobile/photo-5_xzlufm.jpg?updatedAt=1716226228660','a cute puppet',0);
INSERT INTO photos VALUES(14,'2024-05-18 19:08:48','https://ik.imagekit.io/ivansmiths/desktop/photo-4_wlag8f.jpg?updatedAt=1716226091602','https://ik.imagekit.io/ivansmiths/mobile/photo-4_uq3gs2.jpg?updatedAt=1716226234405','a statue holding a cross',0);
INSERT INTO photos VALUES(15,'2024-05-18 19:09:31','https://ik.imagekit.io/ivansmiths/desktop/photo-2_gjajzb.jpg?updatedAt=1716226099088','https://ik.imagekit.io/ivansmiths/mobile/photo-2_rco5da.jpg?updatedAt=1716226230723','a tree with the number 21',0);
INSERT INTO photos VALUES(16,'2024-05-18 19:10:30','https://ik.imagekit.io/ivansmiths/desktop/photo-3_r2duab.jpg?updatedAt=1716226097337','https://ik.imagekit.io/ivansmiths/mobile/photo-3_rnchli.jpg?updatedAt=1716226236269','humanoids objects',0);
INSERT INTO photos VALUES(18,'2024-05-18 19:12:08','https://ik.imagekit.io/ivansmiths/desktop/photo-9_atu3af.jpg?updatedAt=1716226109177','https://ik.imagekit.io/ivansmiths/mobile/photo-9_mtsqax.jpg?updatedAt=1716226222570','a dirty statue',0);
INSERT INTO photos VALUES(19,'2024-05-18 19:12:57','https://ik.imagekit.io/ivansmiths/desktop/photo-8_zwkmeu.jpg?updatedAt=1716226107198','https://ik.imagekit.io/ivansmiths/mobile/photo-9_mtsqax.jpg?updatedAt=1716226222570','a dirty statue from behind',0);
CREATE TABLE IF NOT EXISTS `renders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`desktop_url` text NOT NULL,
	`mobile_url` text NOT NULL,
	`alt` text NOT NULL,
	`is_horizontal` integer DEFAULT false NOT NULL
);
INSERT INTO renders VALUES(1,'2024-05-21 12:01:15','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity8.jpg?updatedAt=1716291138883','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity8.jpg?updatedAt=1716291138883','a render of a sword',0);
INSERT INTO renders VALUES(2,'2024-05-21 12:01:46','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity12.jpg?updatedAt=1716291138703','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity12.jpg?updatedAt=1716291138703','a render of a sword',0);
INSERT INTO renders VALUES(3,'2024-05-21 12:49:35','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity11.jpg?updatedAt=1716291138667','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity11.jpg?updatedAt=1716291138667','a render of a sword',0);
INSERT INTO renders VALUES(4,'2024-05-21 12:50:39','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity7.jpg?updatedAt=1716291138538','https://ik.imagekit.io/ivansmiths/renders/desktop/Fraternity7.jpg?updatedAt=1716291138538','a detailed render of a sword',0);
INSERT INTO renders VALUES(5,'2024-05-21 12:51:52','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11.jpg?updatedAt=1716291136566','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11.jpg?updatedAt=1716291136566','a render of a Mexican looking skeleton',0);
INSERT INTO renders VALUES(6,'2024-05-21 12:52:08','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_4.jpg?updatedAt=1716291136964','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_4.jpg?updatedAt=1716291136964','a render of a Mexican looking skeleton',0);
INSERT INTO renders VALUES(7,'2024-05-21 12:52:47','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_3.jpg?updatedAt=1716291136727','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_3.jpg?updatedAt=1716291136727','a render of a Mexican looking skeleton',0);
INSERT INTO renders VALUES(8,'2024-05-21 12:53:22','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_clay.jpg?updatedAt=1716291136960','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_clay.jpg?updatedAt=1716291136960','a render of a Mexican looking skeleton',0);
INSERT INTO renders VALUES(9,'2024-05-21 12:53:45','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_lowpoly_wire.png?updatedAt=1716291136774','https://ik.imagekit.io/ivansmiths/renders/desktop/Skeleton11_lowpoly_wire.png?updatedAt=1716291136774','a render of a Mexican looking skeleton',0);
INSERT INTO renders VALUES(10,'2024-05-21 12:54:19','https://ik.imagekit.io/ivansmiths/renders/desktop/Goose5.jpg?updatedAt=1716291135284','https://ik.imagekit.io/ivansmiths/renders/desktop/Goose5.jpg?updatedAt=1716291135284','a render of an elegant looking goose',0);
INSERT INTO renders VALUES(11,'2024-05-21 12:54:35','https://ik.imagekit.io/ivansmiths/renders/desktop/Goose8.jpg?updatedAt=1716291135284','https://ik.imagekit.io/ivansmiths/renders/desktop/Goose8.jpg?updatedAt=1716291135284','a render of an elegant looking goose',0);
INSERT INTO renders VALUES(12,'2024-05-21 12:55:52','https://ik.imagekit.io/ivansmiths/renders/desktop/DwarfGekko.jpg?updatedAt=1716291138668','https://ik.imagekit.io/ivansmiths/renders/desktop/DwarfGekko.jpg?updatedAt=1716291138668','a render of a Dwarf Gekko (Metal Gear 4 prop)',0);
INSERT INTO renders VALUES(13,'2024-05-21 12:56:32','https://ik.imagekit.io/ivansmiths/renders/desktop/dice3.jpg?updatedAt=1716291138477','https://ik.imagekit.io/ivansmiths/renders/desktop/dice3.jpg?updatedAt=1716291138477','a render of King Dice (Cuphead villain)',1);
INSERT INTO renders VALUES(14,'2024-05-21 12:57:18','https://ik.imagekit.io/ivansmiths/renders/desktop/coke5.jpg?updatedAt=1716291137186','https://ik.imagekit.io/ivansmiths/renders/desktop/coke5.jpg?updatedAt=1716291137186','a render of a coke',0);
INSERT INTO renders VALUES(15,'2024-05-21 12:57:47','https://ik.imagekit.io/ivansmiths/renders/desktop/coke6.jpg?updatedAt=1716291137127','https://ik.imagekit.io/ivansmiths/renders/desktop/coke6.jpg?updatedAt=1716291137127','a render of a coke',0);
INSERT INTO renders VALUES(16,'2024-05-21 12:58:03','https://ik.imagekit.io/ivansmiths/renders/desktop/coke2.png?updatedAt=1716291136838','https://ik.imagekit.io/ivansmiths/renders/desktop/coke2.png?updatedAt=1716291136838','another render of a coke',0);
INSERT INTO renders VALUES(17,'2024-05-21 12:59:16','https://ik.imagekit.io/ivansmiths/renders/desktop/Abe6.jpg?updatedAt=1716291137104','https://ik.imagekit.io/ivansmiths/renders/desktop/Abe6.jpg?updatedAt=1716291137104','a render of Abe (Abe`s Odyssey protagonist)',0);
INSERT INTO renders VALUES(18,'2024-05-21 12:59:57','https://ik.imagekit.io/ivansmiths/renders/desktop/Abe5.jpg?updatedAt=1716291136966','https://ik.imagekit.io/ivansmiths/renders/desktop/Abe5.jpg?updatedAt=1716291136966','a render of Abe (Abe`s Odyssey protagonist)',0);
INSERT INTO renders VALUES(19,'2024-05-21 13:00:43','https://ik.imagekit.io/ivansmiths/renders/desktop/MGMK23.jpg?updatedAt=1716291135297','https://ik.imagekit.io/ivansmiths/renders/desktop/MGMK23.jpg?updatedAt=1716291135297','a render of a MKII (Metal Gear Solid 4 prop)',0);
INSERT INTO renders VALUES(20,'2024-05-21 13:00:59','https://ik.imagekit.io/ivansmiths/renders/desktop/MGMK24.jpg?updatedAt=1716291135270','https://ik.imagekit.io/ivansmiths/renders/desktop/MGMK24.jpg?updatedAt=1716291135270','a render of a MKII (Metal Gear Solid 4 prop)',0);
INSERT INTO renders VALUES(21,'2024-05-21 13:01:27','https://ik.imagekit.io/ivansmiths/renders/desktop/RatMan4.jpg?updatedAt=1716291135234','https://ik.imagekit.io/ivansmiths/renders/desktop/RatMan4.jpg?updatedAt=1716291135234','a render of RatMan',0);
INSERT INTO renders VALUES(22,'2024-05-21 13:01:44','https://ik.imagekit.io/ivansmiths/renders/desktop/RatMan7.jpg?updatedAt=1716291135045','https://ik.imagekit.io/ivansmiths/renders/desktop/RatMan7.jpg?updatedAt=1716291135045','a render of RatMan',1);
INSERT INTO renders VALUES(23,'2024-05-21 13:02:10','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull2.jpg?updatedAt=1716291135232','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull2.jpg?updatedAt=1716291135232','a render of a Mexican skull',0);
INSERT INTO renders VALUES(24,'2024-05-21 13:02:30','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull3.jpg?updatedAt=1716291135190','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull3.jpg?updatedAt=1716291135190','a render of a Mexican skull',0);
INSERT INTO renders VALUES(25,'2024-05-21 13:02:50','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull4.jpg?updatedAt=1716291135278','https://ik.imagekit.io/ivansmiths/renders/desktop/Mexicanskull4.jpg?updatedAt=1716291135278','a render of a skull',0);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('photos',23);
INSERT INTO sqlite_sequence VALUES('renders',25);
COMMIT;
