

CREATE TABLE master_values(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	values VARCHAR(50) NOT NULL,
	key VARCHAR(50) NOT NULL,
	description TEXT,
	 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE 	CURRENT_TIMESTAMP
)

insert into  master_values ("values","key",) VALUES ("India","camp_location");


CREATE TABLE camps (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  location_id INT NOT NULL
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES master_values(id)
);


insert into  camps ("name","status","location_id") VALUES ("camp one","active",1);
insert into  camps ("name","status","location_id") VALUES ("camp two","active",1);



CREATE TABLE categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  parent_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
   type VARCHAR(50) NOT NULL  COMMENT '1=>catering ',
  FOREIGN KEY (parent_id) REFERENCES category(id)
);

insert into categories  ("name","description","parent_id","status","type")
values("1st class","",null,"active",1);
insert into categories  ("name","description","parent_id","status","type")
values("non veg","",1,"active",1);
insert into categories  ("name","description","parent_id","status","type")
values("veg","",1,"active",1);


CREATE TABLE room_categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  max_occupancy INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into room_categories ("name","price","status")
	values ("1st class","200","active" );

insert into room_categories ("name","price","status")
	values ("2nd class","100","active" );


CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  camp_id INT NOT NULL,
  room_number VARCHAR(20) NOT NULL UNIQUE,
  room_category_id INT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (camp_id) REFERENCES camps(id),
  FOREIGN KEY (room_category_id) REFERENCES room_categories(id)
);

insert into rooms ("camp_id","room_number","room_category_id","is_available","is_available")
	values (1,"1234",1,"active",true );
insert into rooms ("camp_id","room_number","room_category_id","is_available","is_available")
	values (1,"1235",2,"active",true );


CREATE TABLE beds (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  bed_number VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into beds ("bed_number") VALUES("1");
insert into beds ("bed_number") VALUES("2");
insert into beds ("bed_number") VALUES("3");
insert into beds ("bed_number") VALUES("4");

CREATE TABLE room_bed_mappings (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_id INT NOT NULL,
  bed_id INT NOT NULL,
  quantity INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (bed_id) REFERENCES beds(id)
);

insert into beds ("room_id","bed_id") VALUES(1,1);
insert into beds ("room_id","bed_id") VALUES(1,2);
insert into beds ("room_id","bed_id") VALUES(2,3);
insert into beds ("room_id","bed_id") VALUES(2,4);


CREATE TABLE campers (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  date_of_birth DATE NOT NULL,
  medical_info TEXT,
  type ENUM('employee', 'guest') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into campers ("first_name","gender","date_of_birth","type")
	values ("Fejin","Male","1996-02-01","employee")
insert into campers ("first_name","gender","date_of_birth","type")
	values ("Guest naem","Male","1996-02-01","guest")


CREATE TABLE reservations (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  camper_id INT NOT NULL,
  bed_id INT NOT NULL,
  catering_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  actual_check_out_date DATE ,
  check_out_type VARCHAR(20) COMMENT 'close,leave,transfer',
  is_pay BOOLEAN NOT NULL DEFAULT false
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (camper_id) REFERENCES campers(id),
  FOREIGN KEY (camp_bed_id) REFERENCES beds(id),
  FOREIGN KEY (camp_catering_id) REFERENCES categories(id),
);

insert into reservations ("camper_id","bed_id","catering_id","check_in_date","check_out_date")
	values (1,1,1,"2023-04-01","2023-04-05");

