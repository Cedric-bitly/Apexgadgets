import pymysql

# Database connection details
host = "mysql-cedric22a.alwaysdata.net"
user = "cedric22a"
password = "j9B12Q12"
database = "cedric22a_sokogarden"

try:
    # Establish connection
    connection = pymysql.connect(host=host, user=user, password=password, database=database)
    cursor = connection.cursor()
    
    # SQL to create cart table
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL
    
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_product (user_id, product_id)
    )
    """
    
    # Execute the SQL
    cursor.execute(create_table_sql)
    connection.commit()
    
    print("✅ Cart table created successfully!")
    
    # Verify table exists
    cursor.execute("SHOW TABLES LIKE 'cart'")
    result = cursor.fetchone()
    
    if result:
        print("✅ Cart table verified to exist!")
    else:
        print("❌ Cart table creation failed!")
    
    cursor.close()
    connection.close()
    
except Exception as e:
    print(f"❌ Error: {e}")

print("🎯 Script completed!")
