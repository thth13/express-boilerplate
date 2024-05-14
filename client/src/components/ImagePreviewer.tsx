import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Avatar = styled.img`
  width: 169px;
  height: 169px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 10px;
`

const UploadButton = styled.label`
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 50px;
  outline: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #5bd688;
  padding: 7px;
  color: white;
  &:hover {
    background: #23c75f;
  }
`

const ImagePreviewer = ({ avatar, changeAvatar }: any) => {
  const [profileImg, setProfileImg] = useState(
    avatar ? avatar : require('../img/avatar.png'),
  )

  const imageHandler = (e: any) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
    changeAvatar(e.target.files[0])
  }

  useEffect(() => {
    if (avatar) setProfileImg(avatar)
  }, [avatar])

  return (
    <Wrapper>
      <div>
        <Avatar src={profileImg} alt="" id="img" />
      </div>
      <UploadButton htmlFor="input">Upload avatar</UploadButton>
      <input
        style={{ display: 'none' }}
        type="file"
        name="image-upload"
        id="input"
        accept="image/*"
        // value={avatar}
        onChange={imageHandler}
      />
      {/* <label htmlFor="input" className={styles.label}>
        Select photo
      </label> */}
      {/* {errors.avatar && <p className={styles.errorText}>{errors.avatar.message}</p>} */}
    </Wrapper>
  )
}

export default ImagePreviewer
