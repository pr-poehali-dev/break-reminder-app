import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Exercise {
  id: string;
  title: string;
  duration: number;
  category: 'eyes' | 'neck' | 'hands' | 'back';
  icon: string;
  description: string;
}

const exercises: Exercise[] = [
  { id: '1', title: 'Круговые движения глазами', duration: 60, category: 'eyes', icon: 'Eye', description: '10 кругов по часовой, 10 против' },
  { id: '2', title: 'Правило 20-20-20', duration: 20, category: 'eyes', icon: 'ScanEye', description: 'Смотрите на объект в 20 футах 20 секунд' },
  { id: '3', title: 'Наклоны головы', duration: 90, category: 'neck', icon: 'MoveVertical', description: 'Влево-вправо, вперёд-назад' },
  { id: '4', title: 'Вращения шеей', duration: 60, category: 'neck', icon: 'RotateCcw', description: 'Медленные круговые движения' },
  { id: '5', title: 'Растяжка кистей', duration: 60, category: 'hands', icon: 'Hand', description: 'Сгибание и разгибание пальцев' },
  { id: '6', title: 'Вращение запястий', duration: 45, category: 'hands', icon: 'RefreshCw', description: 'По часовой и против часовой' },
  { id: '7', title: 'Наклоны вперёд', duration: 120, category: 'back', icon: 'MoveDown', description: 'Тянитесь к носкам сидя' },
  { id: '8', title: 'Скручивания', duration: 90, category: 'back', icon: 'RotateCw', description: 'Повороты корпуса на стуле' },
];

const categoryNames = {
  eyes: 'Глаза',
  neck: 'Шея',
  hands: 'Кисти',
  back: 'Спина'
};

const categoryColors = {
  eyes: 'bg-accent',
  neck: 'bg-secondary',
  hands: 'bg-primary',
  back: 'bg-destructive'
};

function Index() {
  const [currentView, setCurrentView] = useState<'timer' | 'exercises' | 'stats'>('timer');
  const [timeLeft, setTimeLeft] = useState(1200);
  const [isActive, setIsActive] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedToday, setCompletedToday] = useState(8);
  const [streak, setStreak] = useState(12);
  const [totalMinutes, setTotalMinutes] = useState(247);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((1200 - timeLeft) / 1200) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-md mx-auto p-4 pb-20">
        <header className="mb-6 pt-4 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            DevFit
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Здоровье программиста</p>
        </header>

        <div className="space-y-4">
          {currentView === 'timer' && (
            <div className="animate-scale-in space-y-4">
              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Следующий перерыв</span>
                  </div>
                  
                  <div className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {formatTime(timeLeft)}
                  </div>
                  
                  <Progress value={progressPercentage} className="h-3" />
                  
                  <div className="flex gap-2 justify-center pt-2">
                    <Button 
                      onClick={() => setIsActive(!isActive)}
                      variant={isActive ? "outline" : "default"}
                      size="lg"
                      className="gap-2"
                    >
                      <Icon name={isActive ? "Pause" : "Play"} size={20} />
                      {isActive ? 'Пауза' : 'Старт'}
                    </Button>
                    <Button 
                      onClick={() => setTimeLeft(1200)}
                      variant="outline"
                      size="lg"
                    >
                      <Icon name="RotateCcw" size={20} />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-2xl font-bold text-primary">{completedToday}</div>
                  <div className="text-xs text-muted-foreground mt-1">Сегодня</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <div className="text-2xl font-bold text-secondary">{streak}</div>
                  <div className="text-xs text-muted-foreground mt-1">Дней подряд</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-accent/5">
                  <div className="text-2xl font-bold text-accent">{totalMinutes}</div>
                  <div className="text-xs text-muted-foreground mt-1">Минут всего</div>
                </Card>
              </div>

              <Card className="p-4 bg-gradient-to-r from-secondary/20 to-accent/20 border-secondary/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Icon name="Trophy" size={24} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Отличная работа!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ещё 2 упражнения до достижения "Железная дисциплина"
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentView === 'exercises' && (
            <div className="animate-fade-in space-y-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="eyes">👁️</TabsTrigger>
                  <TabsTrigger value="neck">🦴</TabsTrigger>
                  <TabsTrigger value="hands">✋</TabsTrigger>
                  <TabsTrigger value="back">💪</TabsTrigger>
                </TabsList>
                
                {['all', 'eyes', 'neck', 'hands', 'back'].map(category => (
                  <TabsContent key={category} value={category} className="space-y-3 mt-4">
                    {exercises
                      .filter(ex => category === 'all' || ex.category === category)
                      .map(exercise => (
                        <Card 
                          key={exercise.id}
                          className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:scale-[1.02]"
                          onClick={() => setSelectedExercise(exercise)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${categoryColors[exercise.category]}/20`}>
                              <Icon name={exercise.icon as any} size={24} className={categoryColors[exercise.category].replace('bg-', 'text-')} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{exercise.title}</h3>
                                <Badge variant="secondary" className="text-xs">{exercise.duration}с</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{exercise.description}</p>
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {categoryNames[exercise.category]}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {currentView === 'stats' && (
            <div className="animate-fade-in space-y-4">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Статистика недели
                </h2>
                
                <div className="space-y-3">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
                    const value = [12, 10, 15, 8, 14, 6, 8][index];
                    const maxValue = 15;
                    return (
                      <div key={day} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{day}</span>
                          <span className="font-semibold">{value} упр.</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${(value / maxValue) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
                  <Icon name="Flame" size={28} className="text-accent mb-2" />
                  <div className="text-2xl font-bold">{streak}</div>
                  <div className="text-xs text-muted-foreground mt-1">Дней стрик</div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
                  <Icon name="Clock" size={28} className="text-primary mb-2" />
                  <div className="text-2xl font-bold">{totalMinutes}</div>
                  <div className="text-xs text-muted-foreground mt-1">Минут активности</div>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-secondary" />
                  Достижения
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: 'Medal', active: true },
                    { icon: 'Trophy', active: true },
                    { icon: 'Star', active: true },
                    { icon: 'Zap', active: false },
                    { icon: 'Crown', active: true },
                    { icon: 'Target', active: false },
                    { icon: 'Rocket', active: false },
                    { icon: 'Sparkles', active: true },
                  ].map((achievement, i) => (
                    <div 
                      key={i}
                      className={`aspect-square rounded-xl flex items-center justify-center ${
                        achievement.active 
                          ? 'bg-gradient-to-br from-secondary to-accent' 
                          : 'bg-muted opacity-30'
                      }`}
                    >
                      <Icon name={achievement.icon as any} size={24} className="text-white" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <Button
            variant={currentView === 'timer' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-6"
            onClick={() => setCurrentView('timer')}
          >
            <Icon name="Timer" size={24} />
            <span className="text-xs">Таймер</span>
          </Button>
          <Button
            variant={currentView === 'exercises' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-6"
            onClick={() => setCurrentView('exercises')}
          >
            <Icon name="Dumbbell" size={24} />
            <span className="text-xs">Упражнения</span>
          </Button>
          <Button
            variant={currentView === 'stats' ? 'default' : 'ghost'}
            className="flex-col h-auto gap-1 px-6"
            onClick={() => setCurrentView('stats')}
          >
            <Icon name="BarChart3" size={24} />
            <span className="text-xs">Статистика</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Index;
