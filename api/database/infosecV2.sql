-- MySQL Script generated by MySQL Workbench
-- Mon 21 Jun 2021 02:29:00 PM CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema infosec
-- -----------------------------------------------------

DROP TABLE user;
DROP TABLE comments;
DROP TABLE messages;
DROP TABLE articles;
-- -----------------------------------------------------
-- Schema infosec
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inf0_sec` DEFAULT CHARACTER SET utf8 ;
USE `inf0_sec` ;

-- -----------------------------------------------------
-- Table `infosec`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inf0_sec`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NULL,
  `full_name` VARCHAR(20) NOT NULL UNIQUE,
  `nickname` VARCHAR(20) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `is_verified` TINYINT NOT NULL DEFAULT 0,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  `is_banned` TINYINT NOT NULL DEFAULT 0,
  `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infosec`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inf0_sec`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `image` VARCHAR(255) NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `is_banned` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_user1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_articles_user1`
    FOREIGN KEY (`author_id`)
    REFERENCES `inf0_sec`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `infosec`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inf0_sec`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `is_avis` TINYINT NOT NULL DEFAULT 0,
  `is_banned` TINYINT NOT NULL DEFAULT 0,
  `creation_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_user_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_comments_user`
    FOREIGN KEY (`author_id`)
    REFERENCES `inf0_sec`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `infosec`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inf0_sec`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` TINYINT NOT NULL DEFAULT 0,
  `is_banned` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
