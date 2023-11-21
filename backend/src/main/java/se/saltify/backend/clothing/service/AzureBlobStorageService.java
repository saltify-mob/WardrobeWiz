package se.saltify.backend.clothing.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AzureBlobStorageService {
    private final BlobContainerClient blobContainerClient;

    public AzureBlobStorageService(@Value("${azure.blob.connectionString}") String connectionString,
                                   @Value("${azure.blob.containerName}") String containerName
    ) {
        this.blobContainerClient = new BlobContainerClientBuilder().connectionString(connectionString).containerName(containerName).buildClient();
    }

    public String uploadImage(MultipartFile file, String key) {
        BlobClient blobClient = blobContainerClient.getBlobClient(key);

        try {
            blobClient.upload(file.getInputStream(), file.getSize());
            return blobClient.getBlobUrl();
        } catch (IOException e) {
            return null;
        }
    }


    public void deleteImage(String key) {
        BlobClient blobClient = blobContainerClient.getBlobClient(key);

        blobClient.delete();
    }
}
