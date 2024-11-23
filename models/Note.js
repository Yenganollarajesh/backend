module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('Work', 'Personal', 'Others'),
        defaultValue: 'Others',
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Note;
  };
  