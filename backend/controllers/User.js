import uploadOnCloudinary from "../config/cloudinary.js";

import User from "../models/User.js";

export const addNew = async (req, res) => {
  try {
    const { name, phone, address, plan, startDate, endDate, paidAmount, paymentMode } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone are required." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    const newMember = await User.create({
      name,
      phone,
      address,
      image: imageUrl,
      membership: {
        plan,
        startDate,
        endDate,
        paidAmount,
        paymentMode,
        isActive: true,
      },
      owner: req.userid
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully!",
      member: newMember,
    });

  } catch (error) {
    console.error("Add Member Error:", error);
    res.status(500).json({ success: false, message: "Failed to add member." });
  }
};



export const AllMember   = async (req,res)=>{
  try{
  const userid = req.userid;
  const members = await User.find({owner:userid});
   res.status(200).json({
      success: true,
      members
    });

    } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const renew = async (req, res) => {
  const { plan, paidAmount, startDate, endDate } = req.body;
  const { id } = req.params;

  try {
    const member = await User.findById(id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    member.membership.plan = plan;
    member.membership.paidAmount = paidAmount;
    member.membership.startDate = startDate;
    member.membership.endDate = endDate;

    await member.save();

    res.status(200).json({ success: true, message: "Membership renewed successfully", member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await User.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    return res.status(200).json({ success: true, message: "Member deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const editmember = async (req, res) => {
  const { editid } = req.params;
  const { name, phone, address, plan, startDate, endDate, paidAmount, paymentMode } = req.body;

  try {
    const updatedMember = await User.findByIdAndUpdate(
      editid,
      {
        name,
        phone,
        address,
        membership: {
          plan,
          startDate,
          endDate,
          paidAmount,
          paymentMode,
        },
      },
      { new: true }  // ✅ returns the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      updatedMember,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
