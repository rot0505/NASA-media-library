import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

import styles from "./ShowPage.module.scss";
import { Collection, RouteParams } from "../../types";
import { API_ENDPOINT } from "../../config";

const ShowPage = () => {
  const { nasa_id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const responseAsset: any = await axios.get(`${API_ENDPOINT}/asset/${nasa_id}`);
        const responseMetadata: any = await axios.get(`${API_ENDPOINT}/metadata/${nasa_id}`);
        const metadata: any = await axios.get(responseMetadata.data.location);
        const assetData: any = responseAsset.data.collection;

        const title = metadata.data["AVAIL:Title"];
        const location = metadata.data["AVAIL:Location"] || "N/A";
        const photographer = metadata.data["AVAIL:Photographer"] || "N/A";
        const description = metadata.data["AVAIL:Description"] || "N/A";
        const keywords = metadata.data["AVAIL:Keywords"];
        const date = metadata.data["AVAIL:DateCreated"] || "N/A";
        let imageIndex = assetData.items.findIndex((item: any) => item.href.includes("~medium"));
        imageIndex = imageIndex === -1 ? 0 : imageIndex;
        const image = assetData.items[imageIndex].href;
        setCollection({
          title,
          location,
          photographer,
          description,
          keywords,
          date,
          image
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollection();
  }, [nasa_id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      {collection ?
        <div className={styles.showPage}>
          <div className={styles.header}>
            <h2>{collection.title}</h2>
            <Button type="link" size="small" onClick={handleGoBack}>Back</Button>
          </div>
          <div className={styles.container}>
            <img src={collection.image} />
            <div className={styles.info}>
              <div><label>Date Created:</label> {collection.date}</div>
              <div><label>Photographer:</label> {collection.photographer}</div>
              <div><label>Location:</label> {collection.location}</div>
              <div className={styles.keywords}>
                <label>Keywords:</label>
                <div>
                  {collection.keywords[0] !== "" && collection.keywords.map((keyword: string, index: number) => (
                    <span key={index}>{keyword}</span>
                  ))}
                </div>
              </div>
              <div><label>Description:</label> {collection.description}</div>
            </div>
          </div>
        </div>
        :
        <h4>Loading...</h4>
      }
    </div>
  );
};

export default ShowPage;
