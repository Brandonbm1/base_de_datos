-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `primerNombreCliente` VARCHAR(45) NOT NULL,
  `segundoNombreCliente` VARCHAR(45) NULL DEFAULT NULL,
  `primerApellidoCliente` VARCHAR(45) NOT NULL,
  `segundoApellidoCliente` VARCHAR(45) NOT NULL,
  `identificacionCliente` BIGINT NOT NULL,
  `direccionCliente` VARCHAR(45) NOT NULL,
  `telefonoCliente` BIGINT NOT NULL,
  `correoCliente` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empleado` (
  `idEmpleado` INT NOT NULL AUTO_INCREMENT,
  `primerNombreEmpleado` VARCHAR(45) NOT NULL,
  `segundoNombreEmpleado` VARCHAR(45) NULL DEFAULT NULL,
  `primerApellidoEmpleado` VARCHAR(45) NOT NULL,
  `segundoApellidoEmpleado` VARCHAR(45) NOT NULL,
  `tipoDocumentoEmpleado` VARCHAR(45) NOT NULL,
  `documentoEmpleado` BIGINT NOT NULL,
  `roleEmpleado` VARCHAR(45) NOT NULL,
  `codigoEmpleado` INT NOT NULL,
  `generoEmpleado` VARCHAR(45) NOT NULL,
  `tipoContratoEmpleado` VARCHAR(45) NOT NULL,
  `nivelAcademicoEmpleado` VARCHAR(45) NOT NULL,
  `tituloEmpleado` VARCHAR(45) NOT NULL,
  `dependenciaEmpleado` VARCHAR(45) NOT NULL,
  `estadoCivilEmpleado` VARCHAR(45) NOT NULL,
  `fechaNacimientoEmpleado` DATETIME NOT NULL,
  `lugarNacimientoEmpleado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEmpleado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`proyecto` (
  `idProyecto` INT NOT NULL AUTO_INCREMENT,
  `nombreProyecto` VARCHAR(45) NOT NULL,
  `fechaIni` DATETIME NOT NULL,
  `fechaFin` DATETIME NOT NULL,
  `fechaEntre` DATETIME NULL DEFAULT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `precioProyecto` BIGINT NOT NULL,
  `costoProyecto` BIGINT NOT NULL,
  `utilidadProyecto` BIGINT NOT NULL,
  `costoManodeObra` INT NOT NULL,
  `idCliente` INT NOT NULL,
  `idEmpleado` INT NOT NULL,
  PRIMARY KEY (`idProyecto`),
  INDEX `fk_Proyecto_Cliente_idx` (`idCliente` ASC) VISIBLE,
  INDEX `fk_Proyecto_Empleado1_idx` (`idEmpleado` ASC) VISIBLE,
  CONSTRAINT `fk_Proyecto_Cliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `mydb`.`cliente` (`idCliente`),
  CONSTRAINT `fk_Proyecto_Empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `mydb`.`empleado` (`idEmpleado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`sprint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sprint` (
  `idSprint` INT NOT NULL AUTO_INCREMENT,
  `numSprint` INT NOT NULL,
  `estadoSprint` VARCHAR(45) NOT NULL,
  `cantidadHistorias` INT NULL DEFAULT NULL,
  `fechaIni` DATETIME NOT NULL,
  `fechaFin` DATETIME NOT NULL,
  `fechaEntre` DATETIME NULL DEFAULT NULL,
  `idProyecto` INT NOT NULL,
  `idEmpleadoCargo` INT NOT NULL,
  PRIMARY KEY (`idSprint`),
  INDEX `fk_Sprint_Proyecto1_idx` (`idProyecto` ASC) VISIBLE,
  INDEX `fk_Sprint_Empleado1_idx` (`idEmpleadoCargo` ASC) VISIBLE,
  CONSTRAINT `fk_Sprint_Empleado1`
    FOREIGN KEY (`idEmpleadoCargo`)
    REFERENCES `mydb`.`empleado` (`idEmpleado`),
  CONSTRAINT `fk_Sprint_Proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `mydb`.`proyecto` (`idProyecto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`historias_de_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`historias_de_usuario` (
  `idHistorias_de_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombreHistoria` VARCHAR(45) NOT NULL,
  `descripcionHistoria` VARCHAR(100) NOT NULL,
  `prioridadHistoria` VARCHAR(45) NOT NULL,
  `estadoHistoria` VARCHAR(45) NOT NULL,
  `dificultadHistoria` VARCHAR(45) NOT NULL,
  `fechaIni` DATETIME NOT NULL,
  `fechafin` DATETIME NOT NULL,
  `fechaEntre` DATETIME NULL DEFAULT NULL,
  `idProyecto` INT NOT NULL,
  `idSprint` INT NOT NULL,
  `idEmpleado` INT NOT NULL,
  PRIMARY KEY (`idHistorias_de_usuario`),
  INDEX `fk_Historias_de_usuario_Proyecto1_idx` (`idProyecto` ASC) VISIBLE,
  INDEX `fk_Historias_de_usuario_Sprint1_idx` (`idSprint` ASC) VISIBLE,
  INDEX `fk_Historias_de_usuario_Empleado1_idx` (`idEmpleado` ASC) VISIBLE,
  CONSTRAINT `fk_Historias_de_usuario_Empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `mydb`.`empleado` (`idEmpleado`),
  CONSTRAINT `fk_Historias_de_usuario_Proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `mydb`.`proyecto` (`idProyecto`),
  CONSTRAINT `fk_Historias_de_usuario_Sprint1`
    FOREIGN KEY (`idSprint`)
    REFERENCES `mydb`.`sprint` (`idSprint`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`pruebas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pruebas` (
  `idPruebas` INT NOT NULL AUTO_INCREMENT,
  `nombrePrueba` VARCHAR(45) NOT NULL,
  `descripcionPrueba` VARCHAR(100) NOT NULL,
  `fechaIni` DATETIME NOT NULL,
  `fechaFin` DATETIME NOT NULL,
  `fechaEntre` DATETIME NULL DEFAULT NULL,
  `idHistorias_de_usuario` INT NOT NULL,
  PRIMARY KEY (`idPruebas`),
  INDEX `fk_Pruebas_Historias_de_usuario1_idx` (`idHistorias_de_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Pruebas_Historias_de_usuario1`
    FOREIGN KEY (`idHistorias_de_usuario`)
    REFERENCES `mydb`.`historias_de_usuario` (`idHistorias_de_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`error`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`error` (
  `idError` INT NOT NULL AUTO_INCREMENT,
  `nombreError` VARCHAR(45) NOT NULL,
  `descripcionError` VARCHAR(100) NOT NULL,
  `idEmpleado` INT NOT NULL,
  `idPruebas` INT NOT NULL,
  PRIMARY KEY (`idError`),
  INDEX `fk_Error_Empleado1_idx` (`idEmpleado` ASC) VISIBLE,
  INDEX `fk_Error_Pruebas1_idx` (`idPruebas` ASC) VISIBLE,
  CONSTRAINT `fk_Error_Empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `mydb`.`empleado` (`idEmpleado`),
  CONSTRAINT `fk_Error_Pruebas1`
    FOREIGN KEY (`idPruebas`)
    REFERENCES `mydb`.`pruebas` (`idPruebas`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
