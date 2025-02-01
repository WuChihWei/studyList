"use client";
import { useState } from 'react';
import { useUserData } from '../../hooks/useUserData';
import { Material } from '../../types/User';
import styles from './profile.module.css';
import Image from 'next/image';

export default function ProfilePage() {
  const { userData, loading, addMaterial } = useUserData();
  const [activeTab, setActiveTab] = useState('topic1');
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: '',
    url: '',
    rating: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addMaterial({
      ...newMaterial,
      dateAdded: new Date()
    });

    if (success) {
      setNewMaterial({ title: '', type: '', url: '', rating: 5 });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Please log in</div>;
  
  const materials = userData.materials || [];

  const MaterialList = ({ type, icon, materials }: { type: string; icon: string; materials: Material[] }) => {
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddMaterial = async (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const title = formData.get('title') as string;
      const url = formData.get('url') as string;
      
      if (!title || !type) {
        alert('Please fill in all required fields');
        return;
      }
      
      const newMaterial = {
        type,
        title,
        url: url || null,
        rating: 5,
        dateAdded: new Date()
      };

      try {
        const success = await addMaterial(newMaterial);
        if (success) {
          setShowAddForm(false);
          form.reset();
        }
      } catch (error) {
        console.error('Failed to add material:', error);
        alert('Failed to add material. Please try again.');
      }
    };

    return (
      <div className={styles.materialSection}>
        <div className={styles.materialHeader}>
          <span className={styles.materialIcon}>{icon}</span>
        </div>
        <div className={styles.materialItems}>
          {materials
            .filter(m => m.type === type)
            .map((material, index) => (
              <div key={index} className={styles.materialRow}>
                <span className={styles.materialNumber}>{index + 1}</span>
                <div className={styles.materialPreview}>
                  <Image
                    src="/placeholder-preview.png"
                    alt="Preview"
                    width={32}
                    height={32}
                    className={styles.previewImage}
                  />
                </div>
                <span className={styles.materialName}>{material.title}</span>
                <button className={styles.moreButton}>⋮</button>
              </div>
            ))}
          
          {showAddForm ? (
            <form onSubmit={handleAddMaterial} className={styles.addForm}>
              <input
                type="text"
                name="title"
                placeholder={`Name of ${type}`}
                required
                className={styles.addInput}
              />
              <input
                type="url"
                name="url"
                placeholder="URL (optional)"
                className={styles.addInput}
              />
              <div className={styles.formButtons}>
                <button type="submit" className={styles.submitButton}>Add</button>
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              className={styles.addMaterialButton}
              onClick={() => setShowAddForm(true)}
            >
              <span className={styles.plusIcon}>+</span>
              Add New Material...
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarSection}>
            <Image
              src="/avatar-placeholder.png"
              alt="Profile"
              width={80}
              height={80}
              className={styles.avatar}
            />
            <h2>Leonardo da Vinci</h2>
            <span className={styles.profileLink}>davinc.in/davinci</span>
          </div>
          <p className={styles.bio}>
            Hi! I'm Eric, a content creator known for engaging and quality content across blogs, 
            social media, and more. Eager to bring your brand's story to life!
          </p>
        </div>
      </div>

      {/* Topic Section */}
      <div className={styles.topicSection}>
        <div className={styles.topicHeader}>
          <h2>Topic 1</h2>
          <div className={styles.topicTabs}>
            <button className={`${styles.topicTab} ${activeTab === 'topic1' ? styles.active : ''}`}>
              topic1
            </button>
            <button className={styles.topicTab}>topic 2</button>
            <button className={styles.topicTab}>Topic 3</button>
          </div>
        </div>

        {/* Materials Grid - Two Columns */}
        <div className={styles.materialsGrid}>
          <div className={styles.materialColumn}>
            <MaterialList type="webpage" icon="🌐" materials={materials} />
            <MaterialList type="video" icon="🎥" materials={materials} />
          </div>
          <div className={styles.materialColumn}>
            <MaterialList type="podcast" icon="🎧" materials={materials} />
            <MaterialList type="book" icon="📚" materials={materials} />
          </div>
        </div>
      </div>
    </div>
  );
}