import userModelRecord from "../models/mRecordsModel.js";

// ✅ GET Medical Records
export const getRecords = async (req, res) => {
  try {
    const records = await userModelRecord.find({ user: req.body.userId });
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ CREATE Medical Record
export const createRecord = async (req, res) => {
  const { userId, heartBeat, systolic, diaSystolic, sugar, date } = req.body;

  if (!heartBeat || !systolic || !diaSystolic || !sugar || !date) {
    return res.json({ success: false, message: "Fields are empty" });
  }
  
console.log("hello how are your");

  try {
    const existingRecord = await userModelRecord.findOne({
      user: userId,
      date: new Date(date).toISOString(),
    });

    if (existingRecord) {
      return res.json({ success: false, message: "Today's data already exists" });
    }

    const newRecord = new userModelRecord({
      user: userId,
      heartBeat,
     bloodPressure:
     {
      systolic,
      diaSystolic
     } ,
      sugar,
      date: new Date(date),
    });

    await newRecord.save();
    return res.json({ success: true, message: "Data added successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ EDIT Medical Record
export const editRecord = async (req, res) => {
  const { userId, heartBeat, systolic, diaSystolic, sugar } = req.body;
  const date = req.params.date; // ✅ Ensure Date Format

  if (!heartBeat || !systolic || !diaSystolic || !sugar) {
    return res.json({ success: false, message: "Fields are empty" });
  }

  try {
    const record = await userModelRecord.findOneAndUpdate(
      { user: userId, date: date },
      { heartBeat, bloodPressure: { systolic, diaSystolic }, sugar },
      { new: true }
    );

    if (!record) {
      return res.json({ success: false, message: "No record found for the given date" });
    }

    return res.json({ success: true, message: "Record updated successfully", record });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ DELETE Medical Record
export const deleteRecord = async (req, res) => {
  const { userId } = req.body;
  const date = new Date(req.params.date).toISOString(); // ✅ Ensure Date Format

  try {
    const deletedRecord = await userModelRecord.findOneAndDelete({ user: userId, date });

    if (!deletedRecord) {
      return res.json({ success: false, message: "No record found for deletion" });
    }

    return res.json({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
