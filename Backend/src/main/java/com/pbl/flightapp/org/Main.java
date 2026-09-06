package com.pbl.flightapp.org;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// @SpringBootApplication
// HikariConfig : thư viện quản lí kết nối cơ sở dữ liệu
public class Main {
    private static final String URL = "jdbc:sqlserver://localhost:1433;databaseName=FLIGHTS;encrypt=false";
    private static final String USER = "hau_admin";
    private static final String PASSWORD = "Thanhhau1203@";
    private static HikariDataSource dataSource;

    private static DataSource getDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(URL);
        config.setUsername(USER);
        config.setPassword(PASSWORD);
        config.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        config.setMaximumPoolSize(10);
        return dataSource = new HikariDataSource(config);
    }

    private static void closeDataSource() {
        if (dataSource != null) {
            dataSource.close();
        }
    }

    public static void main(String[] args) {
        try (Connection conn = getDataSource().getConnection()) {
            String sql = "SELECT * FROM Plane";
            try (PreparedStatement stmt = conn.prepareStatement(sql);
                    ResultSet rs = stmt.executeQuery()) {
                int index = 1;
                while (rs.next()) {
                    System.out.println(
                            "Column " + index + ": " + rs.getString(1) + " " + rs.getString(2) + " " + rs.getString(3)
                                    + " "
                                    + rs.getString(4) + " " + rs.getString(5) + " " + rs.getString(6));
                    index++;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        closeDataSource();
    }
}
// Đưa vào cache , đọc những cột cần thiết
// update vào sql theo định kì
// ...
