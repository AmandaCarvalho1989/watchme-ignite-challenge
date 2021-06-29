import React, { useEffect, useState } from "react";
import { GenreResponseProps } from "../App";
import { Button } from "../components/Button";
import { api } from "../services/api";

interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export const SideBar: React.FC<SideBarProps> = ({
  handleClickButton,
  selectedGenreId,
}) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};
