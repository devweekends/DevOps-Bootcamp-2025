const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

//Get object url
async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "devweekends-nodejs",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

// Put object url
async function putObjectURL(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "devweekends-nodejs",
    Key: `images/user-uploads/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

//Get bucket objects
async function listObject() {
  const command = new ListObjectsV2Command({
    Bucket: "devweekends-nodejs",
    Key: "/",
  });
  const res = await s3Client.send(command);
  console.log(res);
}

async function init() {
  //   console.log("Object URL: ", await getObjectURL("demo.jpg"));
  //   console.log(
  //     "URL for uploads: ",
  //     await putObjectURL(`image-${Date.now()}.jpg`, "image/jpg")
  //   );
  //   await listObject();

  // Delete object
  const command = new DeleteObjectCommand({
    Bucket: "devweekends-nodejs",
    Key: "demo.jpg",
  });
  await s3Client.send(command);
  console.log("Object deleted successfully");
}

init();
