import React, { useLayoutEffect, useState } from "react";
import "./Profile.scss";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Notification from "../../components/notification/Notification";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { validatePhone } from "../../redux/features/auth/authService";

export const shortenText = (text, n) => {
  if (text?.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name,
    designation: user?.designation,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
    role: user?.role,
    isVerified: user?.isVerified,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const cloud_name = process.env.REACT_APP_CLOUD_NAME;
  const upload_preset = "ecompliance_upload";

  const handleInputChange = (e) => {
    //this is to target data we putting in name and value attribute in input field
    const { name, value } = e.target;
    //...formData = Destructure any former properties it has than put new values in the given values like [name]: value
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save the image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/ecompliance/image/upload`,
          { method: "post", body: image }
        );
        const imgData = await response.json();
        console.log("Img Data: ", imgData);
        imageURL = imgData.url;
      }
      if (!validatePhone(profile?.phone)) {
        return toast.error("Please enter a valid Phone Number");
      }
      // Save Profile To DB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        designation: user.designation,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {!profile.isVerified && <Notification />}
      <section>
        <div className="container">
          <PageMenu />
          <h2
            className="--flex-center"
            style={{ color: `${colors.grey[100]}` }}
          >
            Profile
          </h2>
          <div className="--flex-center profile">
            <Card cardClass={"card"}>
              {isLoading && <Loader />}
              {!isLoading && user && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="Profileimg"
                      />
                      <h3>Role : {profile.role}</h3>
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    {/* sx property {{ wordBreak: 'break-all' }} : to display the name of that uploaded image */}
                    <p>
                      <label>Change Photo:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Designation:</label>
                      <input
                        type="text"
                        name="designation"
                        value={profile?.designation}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        value={profile?.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </p>
                    <button className="--btn --btn-block --btn-primary">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || "...";
  return <p className="--color-white">Hi, {shortenText(username, 10)} |</p>;
};

export default Profile;
