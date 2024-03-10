USE [master]
GO
/****** Object:  Database [FrizerskiSalon]    Script Date: 6/5/2023 8:17:24 PM ******/
CREATE DATABASE [FrizerskiSalon]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FrizerskiSalon', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\FrizerskiSalon.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FrizerskiSalon_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\FrizerskiSalon_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FrizerskiSalon] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FrizerskiSalon].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FrizerskiSalon] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET ARITHABORT OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FrizerskiSalon] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FrizerskiSalon] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FrizerskiSalon] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FrizerskiSalon] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET RECOVERY FULL 
GO
ALTER DATABASE [FrizerskiSalon] SET  MULTI_USER 
GO
ALTER DATABASE [FrizerskiSalon] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FrizerskiSalon] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FrizerskiSalon] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FrizerskiSalon] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [FrizerskiSalon] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'FrizerskiSalon', N'ON'
GO
USE [FrizerskiSalon]
GO
/****** Object:  Table [dbo].[Klijent]    Script Date: 6/5/2023 8:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Klijent](
	[korisnickoImeKlij] [nvarchar](50) NOT NULL,
	[lozinkaKlij] [nvarchar](50) NOT NULL,
	[imeKlij] [nvarchar](20) NULL,
	[prezimeKlij] [nvarchar](20) NULL,
	[imejlKlij] [nvarchar](50) NULL,
 CONSTRAINT [PK_1] PRIMARY KEY CLUSTERED 
(
	[korisnickoImeKlij] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Rezervacije]    Script Date: 6/5/2023 8:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rezervacije](
	[datumRezervacije] [date] NOT NULL,
	[vremeRezervacije] [int] NOT NULL,
	[zaposlen] [nvarchar](50) NOT NULL,
	[tretman] [int] NOT NULL,
	[klijent] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[datumRezervacije] ASC,
	[vremeRezervacije] ASC,
	[zaposlen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Tretmani]    Script Date: 6/5/2023 8:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tretmani](
	[IDtret] [int] NOT NULL,
	[nazivTret] [nvarchar](50) NOT NULL,
	[trajanjeTret] [int] NOT NULL,
	[cenaTret] [int] NOT NULL,
	[pol] [char](1) NULL,
 CONSTRAINT [pk_TRETMANI] PRIMARY KEY CLUSTERED 
(
	[IDtret] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[VremeTermina]    Script Date: 6/5/2023 8:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VremeTermina](
	[idT] [int] NOT NULL,
	[VremeOd] [time](7) NULL,
	[VremeDo] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[idT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Zaposleni]    Script Date: 6/5/2023 8:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Zaposleni](
	[korisnickoImeZap] [nvarchar](50) NOT NULL,
	[lozinkaZap] [nvarchar](50) NOT NULL,
	[imeZap] [nvarchar](20) NOT NULL,
	[prezimeZap] [nvarchar](20) NOT NULL,
	[imejlZap] [nvarchar](50) NOT NULL,
	[trenutniStatus] [char](1) NOT NULL,
 CONSTRAINT [PK_1KorisnickoImeZap] PRIMARY KEY CLUSTERED 
(
	[korisnickoImeZap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Rezervacije]  WITH CHECK ADD FOREIGN KEY([klijent])
REFERENCES [dbo].[Klijent] ([korisnickoImeKlij])
GO
ALTER TABLE [dbo].[Rezervacije]  WITH CHECK ADD FOREIGN KEY([tretman])
REFERENCES [dbo].[Tretmani] ([IDtret])
GO
ALTER TABLE [dbo].[Rezervacije]  WITH CHECK ADD FOREIGN KEY([vremeRezervacije])
REFERENCES [dbo].[VremeTermina] ([idT])
GO
ALTER TABLE [dbo].[Rezervacije]  WITH CHECK ADD FOREIGN KEY([zaposlen])
REFERENCES [dbo].[Zaposleni] ([korisnickoImeZap])
GO
ALTER TABLE [dbo].[Tretmani]  WITH CHECK ADD  CONSTRAINT [pol] CHECK  (([pol]='M' OR [pol]='Ž'))
GO
ALTER TABLE [dbo].[Tretmani] CHECK CONSTRAINT [pol]
GO
ALTER TABLE [dbo].[Zaposleni]  WITH CHECK ADD  CONSTRAINT [checkStatus] CHECK  (([trenutniStatus]='N' OR [trenutniStatus]='Z'))
GO
ALTER TABLE [dbo].[Zaposleni] CHECK CONSTRAINT [checkStatus]
GO
USE [master]
GO
ALTER DATABASE [FrizerskiSalon] SET  READ_WRITE 
GO
