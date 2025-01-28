# run.py
from app import create_app

# Create the app
app = create_app()

# Run the app if this file is executed directly
if __name__ == "__main__":
    app.run(debug=True)
