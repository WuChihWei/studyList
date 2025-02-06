import { useState, useEffect, useRef } from 'react';
import styles from './ContributionGraph.module.css';

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  data?: ContributionData[];
}

// 將函數移到組件外部
const generateSquares = (startDate: Date, totalDays: number, contributionData: ContributionData[]) => {
  return [...Array(totalDays)].map((_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const existingData = contributionData.find(d => d.date === dateStr);
    return {
      date: dateStr,
      count: existingData ? existingData.count : 0
    };
  });
};

const ContributionGraph = ({ data = [] }: ContributionGraphProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<ContributionData[]>(() => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // 1月1日
    const endDate = new Date(currentYear, 11, 31); // 12月31日
    
    const weeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const totalDays = weeks * 7;
    
    return generateSquares(startDate, totalDays, data);
  });

  useEffect(() => {
    if (data.length > 0) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);
      
      const weeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const totalDays = weeks * 7;
      
      const newSquares = generateSquares(startDate, totalDays, data);
      setSquares(newSquares);
    }
  }, [data]);

  const getContributionColor = (count: number) => {
    if (count === 0) return 'var(--contribution-empty)';
    if (count <= 1) return 'var(--contribution-l1)';
    if (count <= 3) return 'var(--contribution-l2)';
    if (count <= 6) return 'var(--contribution-l3)';
    return 'var(--contribution-l4)';
  };

  const getMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
    return months;
  };

  const currentYear = new Date().getFullYear();
  const months = getMonths();
  const days = ['M', '', 'W', '', 'F', '', ''] as const;

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.5; // 滾動半個視窗寬度
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // 新增計算每月第一天位置的函數
  const getMonthPositions = () => {
    const positions: { [key: string]: number } = {};
    let currentColumn = 0;
    
    squares.forEach((square, index) => {
      const date = new Date(square.date);
      if (date.getDate() === 1) {  // 如果是每月第一天
        const monthKey = months[date.getMonth()];
        positions[monthKey] = Math.floor(index / 7);  // 計算列位置
      }
    });
    
    return positions;
  };

  const monthPositions = getMonthPositions();

  return (
    <div className={styles.graphContainer}>
      <div className={styles.header}>
        <div className={styles.yearLabel}>{currentYear}</div>
        <div className={styles.navigationButtons}>
          <button 
            className={styles.navButton}
            onClick={() => handleScroll('left')}
            title="Scroll left"
          >
            ◀
          </button>
          <button 
            className={styles.navButton}
            onClick={() => handleScroll('right')}
            title="Scroll right"
          >
            ▶
          </button>
        </div>
      </div>
      <div className={styles.graphScrollContainer} ref={scrollContainerRef}>
        <div className={styles.graph}>
          <ul className={styles.months}>
            {months.map(month => (
              <li 
                key={month} 
                style={{ 
                  gridColumn: monthPositions[month] + 1,
                  gridColumnEnd: 'span 1'
                }}
              >
                {month}
              </li>
            ))}
          </ul>
          <ul className={styles.days}>
            {days.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
          <ul className={styles.squares}>
            {squares.map((square, i) => (
              <li
                key={i}
                style={{ backgroundColor: getContributionColor(square.count) }}
                title={`${square.date}: ${square.count} contributions`}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;