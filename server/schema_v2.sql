use nu_camper;


CREATE TABLE master_values (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `values` VARCHAR(50) NOT NULL,
    `key` VARCHAR(50) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO master_values (`values`, `key`)
VALUES ("India", "camp_location");


CREATE TABLE camps (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    location_id INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES master_values(id)
);

INSERT INTO camps (name, status, location_id,phone,email)
VALUES ("camp one", "active", 1,6786754567,"tesst@test.com"), ("camp two", "active", 1,6789654567,"tesst@test.com");


CREATE TABLE categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    parent_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    type INT NOT NULL  COMMENT '1=>catering ',
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

INSERT INTO categories (`name`, `description`, `parent_id`, `status`, `type`)
VALUES ("1st class", "", null, "active", 1),
    ("`non veg`", "", 1, "active", "1"),
    ("`veg`", "", 1, "active", "1");


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

INSERT INTO room_categories (`name`, `price`, `description`, `max_occupancy`, `status`) 
VALUES ("Single", 1000, "", 1, "active"),
    ("Double", 1500, "", 2, "active");
    
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

insert into rooms (camp_id,room_number,room_category_id,is_available)
	values (1,"1234",1,true ), (1,"1235",2,true );
    
    CREATE TABLE beds (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    number VARCHAR(10) NOT NULL,
    room_id INT NOT NULL,
    status ENUM('available', 'booked', 'maintenance') NOT NULL DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);


INSERT INTO beds (number, room_id, status)
VALUES ("101", 1, "available"), ("102", 1, "available"), ("103", 2, "available");




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

insert into campers (first_name,gender,date_of_birth,type)
	values ("Fejin","Male","1996-02-01","employee");
insert into campers (first_name,gender,date_of_birth,type)
	values ("Guest naem","Male","1996-02-01","guest");


CREATE TABLE reservations (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  camper_id INT NOT NULL,
  bed_id INT NOT NULL,
  catering_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  actual_check_out_date DATE ,
  check_out_type VARCHAR(20) COMMENT 'close,leave,transfer',
  is_pay BOOLEAN NOT NULL DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (camper_id) REFERENCES campers(id),
  FOREIGN KEY (bed_id) REFERENCES beds(id),
  FOREIGN KEY (catering_id) REFERENCES categories(id)
);

insert into reservations (camper_id,bed_id,catering_id,check_in_date,check_out_date)
	values (1,4,1,"2023-04-01","2023-04-05");

