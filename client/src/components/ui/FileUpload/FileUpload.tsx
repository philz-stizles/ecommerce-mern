import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { removeImage, upload } from '../../../actions/product';
import { RootState } from '../../../store/reducers';
import { InputE, ProductModel } from '../../../types';

type Props = {
  values: {
    images: { public_id: string; url: string }[];
  };
  setValues: (values: ProductModel) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const FileUpload = ({ values, setValues, setIsLoading }: Props) => {
  const { user } = useSelector((state: RootState) => ({ ...state }));

  const handleFileResizeAndUpload = (e: InputE) => {
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;

    if (files) {
      setIsLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri: any) => {
            console.log(uri);
            // send back to server to upload to cloudinary
            upload(uri, user ? user.token : '')
              .then((res) => {
                console.log('IMAGE UPLOAD RES DATA', res);
                setIsLoading(false);
                allUploadedFiles.push(res.data);

                // set url to images[] in the parent component state - ProductModel
                // setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setIsLoading(false);
                console.log('CLOUDINARY UPLOAD ERR', err);
              });
          },
          'base64'
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductModel
  };

  const handleImageRemove = (public_id: string) => {
    setIsLoading(true);
    removeImage(public_id, user ? user.token : '')
      .then((res) => {
        setIsLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        // setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              // onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={handleFileResizeAndUpload}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
