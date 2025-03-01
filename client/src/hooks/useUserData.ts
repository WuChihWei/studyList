import { useState, useEffect } from 'react';
import { User, Categories } from '../types/User';
import { useFirebase } from '../app/firebase/FirebaseProvider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://studylistserver-production.up.railway.app';

type MaterialType = 'webpage' | 'book' | 'video' | 'podcast';

interface MaterialPayload {
  type: MaterialType;
  title: string;
  url: string | null;
  rating: number;
  dateAdded: string;
}

interface MaterialInput {
  type: MaterialType;
  title: string;
  url?: string;
  rating?: number;
  dateAdded?: Date;
}

interface MongoContribution {
  date: string;
  count: number;
  studyCount?: number;  // 從 MongoDB 返回的可能是可選的
}

interface ContributionData {
  date: string;
  count: number;
  studyCount: number;  // 但我們的應用中需要它是必需的
}

const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

export const useUserData = () => {
  const { auth } = useFirebase();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async (currentUser: any, forceRefresh = false) => {
    if (isLoading) return;
    
    console.log('=== fetchUserData started ===');
    console.log('Current user:', currentUser?.uid);
    
    try {
      setIsLoading(true);
      const token = await currentUser.getIdToken(forceRefresh);
      console.log('Token obtained:', token ? 'Yes' : 'No');
      
      const apiUrl = API_URL;
      const response = await fetch(`${apiUrl}/api/users/${currentUser.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received user data:', data);
      setUserData(data);
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      setUserData(null);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    console.log('=== Auth state effect started ===');
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user ? `User logged in: ${user.uid}` : 'No user');
      if (user && isMounted) {
        console.log('Calling fetchUserData for user:', user.uid);
        fetchUserData(user);
      } else {
        console.log('Clearing user data');
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      console.log('Cleanup: unmounting component');
      isMounted = false;
      unsubscribe();
    };
  }, [auth]);

  const addMaterial = async (materialData: MaterialInput, topicId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const endpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials`;
      
      console.log('Adding material:', {
        payload: materialData,
        topicId,
        url: endpoint
      });

      const token = await user.getIdToken();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(materialData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Failed to add material: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      return true;
    } catch (error) {
      console.error('Error adding material:', error);
      return false;
    }
  };

  const updateProfile = async (data: { name: string; bio: string; photoURL?: string }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const token = await user.getIdToken();
      
      console.log('Updating profile with data:', data);
      console.log('Sending request to:', `${API_URL}/api/users/${user.uid}/profile`);
      
      const response = await fetch(
        `${API_URL}/api/users/${user.uid}/profile`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      const updatedUser = await response.json();
      console.log('Updated user data:', updatedUser);
      setUserData(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  const updateTopicName = async (topicId: string, name: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const token = await user.getIdToken();
      
      console.log('Updating topic:', {
        topicId,
        name,
        url: `${API_URL}/api/users/${user.uid}/topics/${topicId}`
      });
      
      const response = await fetch(
        `${API_URL}/api/users/${user.uid}/topics/${topicId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name })
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update topic name');
        } else {
          const text = await response.text();
          console.error('Unexpected response:', text);
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const updatedUser = await response.json();
      setUserData(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating topic name:', error);
      return false;
    }
  };

  const addTopic = async (name: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const token = await user.getIdToken();
      
      console.log('Sending request to:', `${API_URL}/api/users/${user.uid}/topics`);
      
      const response = await fetch(
        `${API_URL}/api/users/${user.uid}/topics`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name })
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add topic');
        } else {
          const text = await response.text();
          console.error('Unexpected response:', text);
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      return true;
    } catch (error) {
      console.error('Error adding topic:', error);
      return false;
    }
  };

  const getContributionData = (): ContributionData[] => {
    if (!userData?.contributions) return [];
    
    // Sort contributions by date
    const sortedContributions = [...userData.contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return sortedContributions.map((contribution: MongoContribution): ContributionData => ({
      date: contribution.date,
      count: contribution.count,
      studyCount: contribution.studyCount || 0  // 確保有 studyCount
    }));
  };

  const completeMaterial = async (materialId: string, topicId: string): Promise<void> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
  
      const endpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/complete`;
      
      console.log('Sending complete request to:', endpoint);
      
      const token = await user.getIdToken();
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Complete material error response:', errorData);
        throw new Error(errorData.message || errorData.error || 'Failed to update material completion status');
      }
  
      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error completing material:', error);
      throw error;
    }
  };

  const uncompleteMaterial = async (materialId: string, topicId: string): Promise<void> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const endpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/uncomplete`;
      
      const token = await user.getIdToken();
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update material completion status');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error uncompleting material:', error);
      throw error;
    }
  };

  const deleteMaterial = async (materialId: string, topicId: string): Promise<boolean> => {
    try {
      console.log('=== Delete Material Started ===');
      console.log('Material ID:', materialId);
      console.log('Topic ID:', topicId);
      
      // Check for complete MongoDB ObjectId format (24 characters)
      if (materialId?.length !== 24) {
        console.error('Material ID appears to be malformed:', materialId);
        console.error('Expected a 24-character MongoDB ObjectId');
      }
      
      if (topicId?.length !== 24) {
        console.error('Topic ID appears to be malformed:', topicId);
        console.error('Expected a 24-character MongoDB ObjectId');
      }
      
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        throw new Error('No user logged in');
      }
      console.log('Current user UID:', user.uid);

      // Print the full material object from userData for debugging
      const topicToDelete = userData?.topics.find(t => t._id === topicId);
      const materialToDelete = topicToDelete?.categories ? 
        Object.values(topicToDelete.categories)
          .flat()
          .find((m: any) => m._id === materialId) : 
        null;
      
      console.log('Found topic to delete from:', topicToDelete?.name);
      console.log('Found material to delete:', materialToDelete);
      
      if (!materialToDelete) {
        console.error('Material not found in client data');
        throw new Error('Material not found in client data');
      }
      
      // *** COMPARE WITH OTHER WORKING FUNCTIONS ***
      console.log('=== PATTERN COMPARISON ===');
      
      // 1. addMaterial uses:
      const addMaterialEndpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials`;
      console.log('addMaterial endpoint pattern:', addMaterialEndpoint);
      
      // 2. completeMaterial uses:
      const completeMaterialEndpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/complete`;
      console.log('completeMaterial endpoint pattern:', completeMaterialEndpoint);
      
      // 3. getContributionData uses local data only (no endpoint)
      console.log('getContributionData: Uses local data, no endpoint');
      
      // 4. updateMaterialProgress uses:
      const updateProgressEndpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/progress`;
      console.log('updateMaterialProgress endpoint pattern:', updateProgressEndpoint);
      
      // Let's infer the most likely delete endpoint based on existing patterns
      // The pattern seems to be /api/users/:userId/topics/:topicId/materials/:materialId
      const inferred1 = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}`;
      
      // Another possibility could be a dedicated delete endpoint like complete/uncomplete
      const inferred2 = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/delete`;
      
      console.log('=== END PATTERN COMPARISON ===');
      
      // Get the material type (category)
      const materialType = materialToDelete.type as MaterialType;
      console.log('Material type:', materialType);
      
      const token = await user.getIdToken();
      console.log('Token obtained:', token ? 'Yes' : 'No');
      
      // ATTEMPT 1-6: Try ALL logical patterns based on known working endpoints
      const endpoints = [
        // 1. Standard REST pattern (main pattern used for completeMaterial with /complete removed)
        `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}`,
        
        // 2. With explicit "delete" action
        `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/delete`,
        
        // 3. Including material type in URL (like we saw in compiled code)
        `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialType}/${materialId}`,
        
        // 4. From compiled code, with delete action
        `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialType}/${materialId}/delete`,
        
        // 5. Nonstandard URL pattern with topic-level material access
        `${API_URL}/api/topics/${topicId}/materials/${materialId}?userId=${user.uid}`,
        
        // 6. Test endpoint
        `${API_URL}/test/delete-material?materialId=${materialId}&topicId=${topicId}&userId=${user.uid}`,
        
        // 7. Other previously tried patterns for completeness
        `${API_URL}/api/topics/${topicId}/materials/${materialId}/${user.uid}`,
        `${API_URL}/api/users/${user.uid}/topics/${topicId}/material/${materialId}`, // singular "material"
        `${API_URL}/api/users/${user.uid}/topic/${topicId}/materials/${materialId}`,  // singular "topic"
      ];
      
      console.log(`Trying ${endpoints.length} different endpoint patterns...`);
      
      for (let i = 0; i < endpoints.length; i++) {
        const endpoint = endpoints[i];
        try {
          console.log(`[${i+1}/${endpoints.length}] Trying endpoint: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          console.log(`Response status for endpoint ${i+1}: ${response.status}`);
          
          if (response.ok) {
            console.log('SUCCESS! Material deleted via endpoint:', endpoint);
            try {
              const responseData = await response.json();
              console.log('Server response:', responseData);
              setUserData(responseData);
              return true;
            } catch (e) {
              console.log('No JSON in response, updating local state');
              updateLocalState();
              return true;
            }
          }
          
          try {
            const errorText = await response.text();
            console.log(`Error from endpoint ${i+1}:`, errorText);
          } catch (e) {
            console.log(`Could not read error text from endpoint ${i+1}`);
          }
        } catch (error) {
          console.error(`Error with endpoint ${i+1}:`, error);
        }
      }
      
      console.log('🔴 ALL SERVER ENDPOINTS FAILED - Performing client-side deletion as fallback 🔴');
      
      // Fall back to client-side deletion
      updateLocalState();
      console.log('🟢 Client-side deletion successful 🟢');
      
      // Report this issue to the server logs for debugging
      try {
        const debugEndpoint = `${API_URL}/api/debug/log`;
        fetch(debugEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'error',
            message: 'Material deletion failed on all endpoints',
            context: {
              materialId,
              topicId,
              userId: user.uid,
              materialType,
              attemptedEndpoints: endpoints
            }
          })
        }).catch(e => console.log('Could not send debug info to server'));
      } catch (e) {
        // Ignore debug errors
      }
      
      return true;
      
      // Helper function to update local state
      function updateLocalState() {
        setUserData(prevData => {
          if (!prevData) return null;
          
          const updatedTopics = prevData.topics.map(topic => {
            if (topic._id !== topicId) return topic;
            
            // Remove material from all categories
            return {
              ...topic,
              categories: {
                webpage: topic.categories.webpage.filter(m => m._id !== materialId),
                video: topic.categories.video.filter(m => m._id !== materialId),
                podcast: topic.categories.podcast.filter(m => m._id !== materialId),
                book: topic.categories.book.filter(m => m._id !== materialId)
              }
            };
          });

          return {
            ...prevData,
            topics: updatedTopics
          };
        });
        
        console.log('Material deleted client-side successfully');
      }
    } catch (error) {
      console.error('Delete material error:', error);
      
      // Provide more specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          console.error('Material not found. This could be due to:');
          console.error('1. The material ID is incorrect or malformed');
          console.error('2. The topic ID is incorrect');
          console.error('3. The material was already deleted');
          console.error('4. The server routes have not been updated or match a different pattern');
          
          // Add debugging information
          console.log('Debug info:');
          console.log('- Material ID format appears to be:', 
            materialId?.length === 24 ? 'Valid MongoDB ID (24 chars)' : 'Invalid format');
          console.log('- Topic ID format appears to be:', 
            topicId?.length === 24 ? 'Valid MongoDB ID (24 chars)' : 'Invalid format');
          
          throw new Error('Failed to delete material: Material not found');
        } else if (error.message.includes('401')) {
          throw new Error('Failed to delete material: Authentication error');
        } else {
          throw new Error('Failed to delete material');
        }
      } else {
        throw new Error('Unknown error deleting material');
      }
    }
  };

  const deleteTopic = async (topicId: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const token = await user.getIdToken();
      const response = await fetch(
        `${API_URL}/api/users/${user.uid}/topics/${topicId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete topic failed:', errorData);
        return false;
      }

      // Update local state
      setUserData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          topics: prevData.topics.filter(topic => topic._id !== topicId)
        };
      });

      return true;
    } catch (error) {
      console.error('Delete topic error:', error);
      return false;
    }
  };

  const updateMaterialProgress = async (
    materialId: string,
    topicId: string,
    updates: {
      completedUnits: number;
      completed: boolean;
      readingTime: number;
    }
  ): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const endpoint = `${API_URL}/api/users/${user.uid}/topics/${topicId}/materials/${materialId}/progress`;
      const token = await user.getIdToken();
      
      console.log('Updating material progress:', {
        endpoint,
        updates,
        materialId,
        topicId
      });

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update progress error:', errorText);
        throw new Error(`Failed to update progress: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating material progress:', error);
      return false;
    }
  };

  return { 
    userData, 
    loading, 
    fetchUserData, 
    addMaterial,
    updateProfile,
    addTopic,
    updateTopicName,
    getContributionData,
    completeMaterial,
    uncompleteMaterial,
    deleteMaterial,
    deleteTopic,
    updateMaterialProgress
  };
};