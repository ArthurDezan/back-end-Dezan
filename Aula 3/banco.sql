-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema idev3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema idev3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `idev3` DEFAULT CHARACTER SET utf8 ;
USE `idev3` ;

-- -----------------------------------------------------
-- Table `idev3`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `idev3`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `endereço` VARCHAR(200) NOT NULL,
  `telefone` VARCHAR(14) NULL,
  `CPF` CHAR(11) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
